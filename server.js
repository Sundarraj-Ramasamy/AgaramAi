// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Validate required environment variables
const requiredEnvVars = ['BREVO_EMAIL', 'BREVO_API_KEY', 'ADMIN_EMAIL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

app.use(cors());
app.use(bodyParser.json({ limit: '16mb' }));

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize input
const sanitizeInput = (str) => {
  return str.trim().slice(0, 5000);
};

// POST route to handle form submissions
app.post('/send-email', (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // Validate input length
    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ error: 'Name must be between 2 and 100 characters.' });
    }

    if (message.length < 10 || message.length > 5000) {
      return res.status(400).json({ error: 'Message must be between 10 and 5000 characters.' });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = email.toLowerCase();
    const sanitizedMessage = sanitizeInput(message);

    // Create a Nodemailer transporter using Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_API_KEY
      }
    });

    // Setup email data - send to admin, not user
    const mailOptions = {
      from: process.env.BREVO_EMAIL,
      to: process.env.ADMIN_EMAIL,
      replyTo: sanitizedEmail,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`,
      html: `<h2>New Contact Form Submission</h2>
             <p><strong>Name:</strong> ${sanitizedName}</p>
             <p><strong>Email:</strong> ${sanitizedEmail}</p>
             <p><strong>Message:</strong></p>
             <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email send error:', error.message);
        return res.status(500).json({ error: 'An error occurred while sending your message. Please try again later.' });
      }
      res.status(200).json({ message: 'Your message has been sent successfully!' });
    });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
