import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getNavigation } from '../services/dataService';
import programmerGif from '../assets/programmer.gif';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [navLinks, setNavLinks] = useState<{ name: string; path: string }[]>([]);

  useEffect(() => {
    document.title = 'Pavan Kalyan';
    const fetchNav = async () => {
      const links = await getNavigation();
      setNavLinks(links);
    };
    fetchNav();
  }, []);

  return (
    <div className="landing-page">
      <Navbar links={navLinks} />
      <motion.div
        className="content-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="sketch-container">
          <motion.img
            src={programmerGif}
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
          <h1>Pavan Kalyan Payyavula</h1>
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
