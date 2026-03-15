// server.js

require('dotenv').config(); // Load .env FIRST before anything else

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 5000;

// Max contacts to keep in the JSON file
const MAX_CONTACTS = 1000;

// JWT secret — loaded from .env (required)
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('ERROR: JWT_SECRET is not set in .env file. Please configure it.');
  process.exit(1);
}

// AES-256 encryption key — loaded from .env (required, must be 64 hex chars = 32 bytes)
const ENCRYPTION_KEY_HEX = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY_HEX || ENCRYPTION_KEY_HEX.length < 64) {
  console.error('ERROR: ENCRYPTION_KEY is not set or too short in .env file. Must be 64 hex characters.');
  process.exit(1);
}
const IV_LENGTH = 16;

// Paths for data files
const dataDir = path.join(__dirname, 'data');
const contactsFile = path.join(dataDir, 'contacts.json');
const adminFile = path.join(dataDir, 'admin.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

app.use(cors());
app.use(bodyParser.json({ limit: '16mb' }));

// ─── Helpers ────────────────────────────────────────────────────────────────

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sanitizeInput = (str) => str.trim().slice(0, 5000);

const readJSON = (filePath, fallback) => {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch {
    return fallback;
  }
};

// Encrypt a string using AES-256-CBC
const encrypt = (text) => {
  const key = Buffer.from(ENCRYPTION_KEY_HEX.slice(0, 64), 'hex'); // 32 bytes from hex
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

// Decrypt a string encrypted with encrypt()
const decrypt = (encryptedText) => {
  try {
    const parts = encryptedText.split(':');
    if (parts.length < 2) return encryptedText; // not encrypted, return as-is
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts.slice(1).join(':');
    const key = Buffer.from(ENCRYPTION_KEY_HEX.slice(0, 64), 'hex'); // 32 bytes from hex
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch {
    return encryptedText; // return as-is if decryption fails
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
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }
};

// ─── POST /save-contact ──────────────────────────────────────────────────────

app.post('/save-contact', (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ error: 'Name must be between 2 and 100 characters.' });
    }
    if (message.length < 10 || message.length > 5000) {
      return res.status(400).json({ error: 'Message must be between 10 and 5000 characters.' });
    }

    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = email.toLowerCase().trim();
    const sanitizedMessage = sanitizeInput(message);

    // Encrypt sensitive fields
    const contact = {
      id: Date.now(),
      name: sanitizedName,
      email: encrypt(sanitizedEmail),
      message: encrypt(sanitizedMessage),
      submittedAt: new Date().toISOString()
    };

    let contacts = readJSON(contactsFile, []);
    if (!Array.isArray(contacts)) contacts = [];

    contacts.push(contact);

    // Enforce 1000-record limit: remove oldest entries if over limit
    if (contacts.length > MAX_CONTACTS) {
      contacts = contacts.slice(contacts.length - MAX_CONTACTS);
    }

    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2), 'utf8');
    console.log(`New contact saved: ${sanitizedName} (total: ${contacts.length})`);

    res.status(200).json({ message: 'Contact information saved successfully!', contactId: contact.id });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ error: 'An error occurred while saving your information. Please try again later.' });
  }
});

// ─── POST /admin/login ───────────────────────────────────────────────────────

app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const adminData = readJSON(adminFile, null);
    if (!adminData) {
      return res.status(500).json({ error: 'Admin configuration not found.' });
    }

    // Decrypt stored username and compare (supports both old 'username' field and new 'usernameHash')
    let storedUsername;
    if (adminData.usernameHash) {
      storedUsername = decrypt(adminData.usernameHash);
    } else if (adminData.username) {
      storedUsername = adminData.username;
    } else {
      return res.status(500).json({ error: 'Admin configuration is invalid.' });
    }

    if (username.trim().toLowerCase() !== storedUsername.trim().toLowerCase()) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, adminData.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign(
      { username: storedUsername },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'An error occurred during login. Please try again.' });
  }
});

// ─── GET /admin/contacts ─────────────────────────────────────────────────────

app.get('/admin/contacts', requireAuth, (req, res) => {
  try {
    const contacts = readJSON(contactsFile, []);
    // Decrypt sensitive fields and return newest first
    const decrypted = contacts.map((c) => ({
      ...c,
      email: decrypt(c.email),
      message: decrypt(c.message)
    }));
    const sorted = [...decrypted].reverse();
    res.status(200).json({ contacts: sorted, total: sorted.length });
  } catch (error) {
    console.error('Error reading contacts:', error.message);
    res.status(500).json({ error: 'Failed to retrieve contacts.' });
  }
});

// ─── DELETE /admin/contacts/:id ──────────────────────────────────────────────

app.delete('/admin/contacts/:id', requireAuth, (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    let contacts = readJSON(contactsFile, []);
    const before = contacts.length;
    contacts = contacts.filter((c) => c.id !== id);
    if (contacts.length === before) {
      return res.status(404).json({ error: 'Contact not found.' });
    }
    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2), 'utf8');
    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    console.error('Delete error:', error.message);
    res.status(500).json({ error: 'Failed to delete contact.' });
  }
});

// ─── Start Server ────────────────────────────────────────────────────────────

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
