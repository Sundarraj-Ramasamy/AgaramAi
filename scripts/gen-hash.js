// scripts/gen-hash.js
// This script is used ONCE to set up admin credentials.
// Run: node scripts/gen-hash.js <username> <password>
// It stores:
//   - username: AES-256-CBC encrypted (so plain username is not stored)
//   - password: bcrypt hashed (one-way, cannot be reversed)
//
// After running, delete this script or keep it private.

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Load .env
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ENCRYPTION_KEY_HEX = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY_HEX || ENCRYPTION_KEY_HEX.length < 64) {
  console.error('ERROR: ENCRYPTION_KEY is not set or too short in .env file. Must be 64 hex characters.');
  process.exit(1);
}
const IV_LENGTH = 16;

const encrypt = (text) => {
  const key = Buffer.from(ENCRYPTION_KEY_HEX.slice(0, 64), 'hex');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/gen-hash.js <username> <password>');
  process.exit(1);
}

const [username, password] = args;

bcrypt.hash(password, 12).then((passwordHash) => {
  const usernameEncrypted = encrypt(username);

  const adminData = {
    usernameHash: usernameEncrypted,
    passwordHash
  };

  const adminFile = path.join(__dirname, '..', 'data', 'admin.json');
  fs.mkdirSync(path.dirname(adminFile), { recursive: true });
  fs.writeFileSync(adminFile, JSON.stringify(adminData, null, 2), 'utf8');

  console.log('✅ Admin credentials saved to data/admin.json');
  console.log('   Username is AES-256 encrypted.');
  console.log('   Password is bcrypt hashed (irreversible).');
  console.log('   Plain-text credentials are NOT stored anywhere.');
});
