// src/components/Contact.js

import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/send-email', formData)
      .then((response) => {
        console.log(response.data);
        setSubmitMessage('Email sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error(error);
        setSubmitMessage('An error occurred while sending the email. Please try again later.');
      });
  };

  return (
    <section id="contact">
      <h2>Contact</h2>
      <p>Feel free to reach out to us with any questions or inquiries. You can contact us by filling out the form
        below:</p>
      {submitMessage && <p>{submitMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
