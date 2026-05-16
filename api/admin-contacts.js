import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

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

function decrypt(encryptedText) {
  try {
    const parts = encryptedText.split(':');
    if (parts.length < 2) return encryptedText;
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts.slice(1).join(':');
    const key = Buffer.from(ENCRYPTION_KEY_HEX.slice(0, 64), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch {
    return encryptedText;
  }
}

function requireAuth(req, res) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized. Please log in.' });
    return false;
  }
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    res.status(401).json({ error: 'Invalid or expired session.' });
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!requireAuth(req, res)) return;
  try {
    await dbConnect();
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    const decryptedData = contacts.map(c => ({
      id: c._id,
      name: c.name,
      email: decrypt(c.email),
      message: decrypt(c.message),
      submittedAt: c.submittedAt
    }));
    res.json({ contacts: decryptedData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts.' });
  }
}
