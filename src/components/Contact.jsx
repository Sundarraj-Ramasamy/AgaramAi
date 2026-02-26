import React, { useState, useRef } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', type: '' });
  const alertRef = useRef(null);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must not exceed 100 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > 5000) {
      newErrors.message = 'Message must not exceed 5000 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ text: '', type: '' });

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/send-email', formData);
      setSubmitMessage({ text: response.data.message, type: 'success' });
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      
      // Announce success to screen readers
      if (alertRef.current) {
        alertRef.current.focus();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred while sending your message. Please try again later.';
      setSubmitMessage({ text: errorMessage, type: 'error' });
      
      // Announce error to screen readers
      if (alertRef.current) {
        alertRef.current.focus();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact">
      <h2>Contact</h2>
      <p>Feel free to reach out to us with any questions or inquiries. You can contact us by filling out the form below:</p>

      {submitMessage.text && (
        <div
          ref={alertRef}
          role="alert"
          aria-live="polite"
          className={`form-feedback ${submitMessage.type}`}
          tabIndex="-1"
        >
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">
            Name: <span className="required-indicator" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder="Your full name"
          />
          {errors.name && (
            <span id="name-error" className="error-message" role="status">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email: <span className="required-indicator" aria-label="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <span id="email-error" className="error-message" role="status">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Message: <span className="required-indicator" aria-label="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isLoading}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            placeholder="Your message (minimum 10 characters)"
            rows="6"
          ></textarea>
          {errors.message && (
            <span id="message-error" className="error-message" role="status">
              {errors.message}
            </span>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15648.18473974916!2d77.511216!3d11.331335!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9139ea7a42fa7%3A0xbda41c0f30165be!2sagaramai!5e0!3m2!1sen!2sin!4v1707984893991!5m2!1sen!2sin"
        width="600"
        height="450"
        title="Google Maps - AgaramAi Location"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default Contact;
