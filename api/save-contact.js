import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Connection cache to prevent multiple connections in serverless
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

const crypto = await import('crypto');

const ENCRYPTION_KEY_HEX = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

function encrypt(text) {
  const key = Buffer.from(ENCRYPTION_KEY_HEX.slice(0, 64), 'hex');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required.' });
  }
  try {
    await dbConnect();
    const newContact = new Contact({
      name: name.trim(),
      email: encrypt(email.toLowerCase().trim()),
      message: encrypt(message.trim())
    });
    await newContact.save();
    res.status(200).json({ message: 'Contact saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save information.' });
  }
}
