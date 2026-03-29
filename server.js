require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 5000;

// ─── Environment Validation ──────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET;
const ENCRYPTION_KEY_HEX = process.env.ENCRYPTION_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

if (!JWT_SECRET || !ENCRYPTION_KEY_HEX || !MONGODB_URI) {
  console.error('ERROR: Missing required environment variables (JWT_SECRET, ENCRYPTION_KEY, or MONGODB_URI).');
  process.exit(1);
}

const IV_LENGTH = 16;

// ─── MongoDB Connection ──────────────────────────────────────────────────────
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// ─── Database Schemas ────────────────────────────────────────────────────────
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },    // Encrypted
  message: { type: String, required: true },  // Encrypted
  submittedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['https://agaramai.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: '16mb' }));

// ─── Crypto Helpers ──────────────────────────────────────────────────────────
const encrypt = (text) => {
  const key = Buffer.from(ENCRYPTION_KEY_HEX.slice(0, 64), 'hex');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

const decrypt = (encryptedText) => {
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
};

// ─── Auth Middleware ─────────────────────────────────────────────────────────
const requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session.' });
  }
};

// ─── API Routes ──────────────────────────────────────────────────────────────

// Public: Save Contact
app.post('/save-contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Simple Validation
    if (!name || !email || !message) return res.status(400).json({ error: 'All fields required.' });

    const newContact = new Contact({
      name: name.trim(),
      email: encrypt(email.toLowerCase().trim()),
      message: encrypt(message.trim())
    });

    await newContact.save();
    res.status(200).json({ message: 'Contact saved successfully!' });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save information.' });
  }
});

// Admin: Login
app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // We compare against ENV for admin credentials to keep it simple
    const storedUsername = process.env.ADMIN_USERNAME; 
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;

    if (username !== storedUsername) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, passwordHash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials.' });

    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed.' });
  }
});

// Admin: Get Contacts (Decrypted)
app.get('/admin/contacts', requireAuth, async (req, res) => {
  try {
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
});

// Admin: Delete Contact
app.delete('/admin/contacts/:id', requireAuth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed.' });
  }
});

app.listen(port, () => console.log(`Agaram Server live on port ${port}`));