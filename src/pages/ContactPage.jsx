import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/ContactPage.css';

const ContactPage = () => {
  useEffect(() => {
    document.title = 'Contact | Pavan Kalyan';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please fill in all required fields'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please enter a valid email address'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message! I will get back to you soon.'
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <motion.div 
        className="contact-header"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <h1>Get in Touch</h1>
        <p>Let's connect and create something amazing together</p>
      </motion.div>

      <motion.div
        className="contact-description"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        <h2>Looking for a Skilled Developer?</h2>
        <p>
          I'm always excited to take on new challenges and collaborate on innovative projects. 
          Whether you have a specific project in mind or just want to discuss potential opportunities, 
          I'm here to help turn your ideas into reality.
        </p>
        <p>
          Feel free to reach out through any of the contact methods below or fill out the contact form. 
          I typically respond within 24 hours.
        </p>
      </motion.div>

      <div className="contact-content">
        <motion.div 
          className="contact-info"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.3 }}
        >
          <h2>Contact Information</h2>
          <div className="contact-methods">
            <a href="mailto:pavankalyanpayyavula24@gmail.com" className="contact-method">
              <div className="method-icon">📧</div>
              <div className="method-details">
                <h3>Email</h3>
                <p>pavankalyanpayyavula24@gmail.com</p>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/pavankalyanpayyavula24/" target="_blank" rel="noopener noreferrer" className="contact-method">
              <div className="method-icon">💼</div>
              <div className="method-details">
                <h3>LinkedIn</h3>
                <p>linkedin.com/in/pavankalyanpayyavula24</p>
              </div>
            </a>
            <a href="https://github.com/pavankalyanpayyavula-codes" target="_blank" rel="noopener noreferrer" className="contact-method">
              <div className="method-icon">🐱</div>
              <div className="method-details">
                <h3>GitHub</h3>
                <p>/github.com/pavankalyanpayyavula-codes</p>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="contact-form-container"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.4 }}
        >
          <div className="form-header">
            <h2>Send a Message</h2>
            <p>Fill out the form below and I'll get back to you as soon as possible.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
                rows="5"
              />
            </div>

            {formStatus.message && (
              <motion.div 
                className={formStatus.error ? 'error-message' : 'success-message'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formStatus.message}
              </motion.div>
            )}

            <button 
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  Sending...
                  <span className="loading-spinner"></span>
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage; 
