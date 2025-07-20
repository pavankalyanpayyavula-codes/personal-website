import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/LandingPage.css';

const LandingPage = () => {
  useEffect(() => {
    document.title = 'Pavan Kalyan';
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      <motion.div 
        className="content-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="sketch-container">
          <motion.img 
            src="https://camo.githubusercontent.com/5119ee303e5e49cdf23def653b737bede0da49a859a34714d62d9ab518afbbb2/68747470733a2f2f63646e2e6472696262626c652e636f6d2f75736572732f313136323037372f73637265656e73686f74732f333834383931342f70726f6772616d6d65722e676966"
            alt="Programmer Animation"
            className="developer-sketch"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <motion.div 
          className="name-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1>Pavan Kalyan</h1>
          <p className="title">Senior Software Engineer</p>
        </motion.div>

        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link to="/about" className="cta-button primary">About Me</Link>
          <Link to="/contact" className="cta-button secondary">Get in Touch</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage; 