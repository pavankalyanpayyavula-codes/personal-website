import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Pavan Kalyan Payyavula</h1>
        <div className="contact-info">
          <a href="tel:+91-9491669116">+91-9491669116</a>
          <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer">LeetCode</a>
          <a href="mailto:pavankalyanpayyavula24@gmail.com">pavankalyanpayyavula24@gmail.com</a>
        </div>
      </div>

      <div className="about-content">
        <div className="skills-section">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {[
              'React', 'Vue.js', 'JavaScript', 'TypeScript', 'CSS', 'HTML',
              'Webpack', 'Redux', 'Github', 'Figma', 'MySQL', 'GraphQL'
            ].map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div className="achievements-section">
          <h2>Achievements</h2>
          <ul>
            <li>The Ultimate Contributor Award - Cognizant (Oct 2021)</li>
            <li>Best Newcomer Award - Rakuten India (Jun 2022)</li>
            <li>Individual Excellence Award - Rakuten India (Jun 2024)</li>
          </ul>
        </div>

        <div className="certifications-section">
          <h2>Certifications</h2>
          <ul>
            <li>React Js Certified by HackerRank (Certificate ID: 2CA2ECBE1EF3)</li>
            <li>JavaScript Certified by HackerRank (Certificate ID: 49AD2D25645B)</li>
          </ul>
        </div>

        <div className="education-section">
          <h2>Education</h2>
          <div className="education-item">
            <h3>Narasaraopeta Engineering College</h3>
            <p>BE/B.Tech/BS - 2019</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 