import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitStatus('sending');
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setSubmitStatus(''), 5000);
      } catch (error) {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(''), 5000);
      }
    }
  };

  return (
    <div className="contact-container">
      <h1>Get in Touch</h1>
      <p className="contact-intro">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
      </p>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-method">
            <h3>📧 Email</h3>
            <p>pavankalyanpayyavula24@gmail.com</p>
          </div>
          <div className="contact-method">
            <h3>📱 Phone</h3>
            <p>+91-9491669116</p>
          </div>
          <div className="contact-method">
            <h3>🔗 Social</h3>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer">LeetCode</a>
            </div>
          </div>
          <div className="contact-method">
            <h3>⏰ Response Time</h3>
            <p>Usually within 24 hours</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Your name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="your.email@example.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? 'error' : ''}
              placeholder="What's this about?"
            />
            {errors.subject && <span className="error-message">{errors.subject}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
              rows="5"
              placeholder="Your message here..."
            ></textarea>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${submitStatus}`}
            disabled={submitStatus === 'sending'}
          >
            {submitStatus === 'sending' ? 'Sending...' : 
             submitStatus === 'success' ? 'Message Sent!' : 
             submitStatus === 'error' ? 'Failed to Send' : 
             'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <div className="success-message">
              Thank you for your message! I'll get back to you soon.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="error-message">
              Sorry, there was an error sending your message. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact; 