import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/About.css';

const About = () => {
  useEffect(() => {
    document.title = 'About | Pavan Kalyan';
  }, []);

  return (
    <>
      <Navbar />
      <div className="about-container">
        About Page
      </div>
    </>
  );
};

export default About; 