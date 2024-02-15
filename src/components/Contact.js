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
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15648.18473974916!2d77.511216!3d11.331335!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9139ea7a42fa7%3A0xbda41c0f30165be!2sagaramai!5e0!3m2!1sen!2sin!4v1707984893991!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </section>
  );
};

export default Contact;
