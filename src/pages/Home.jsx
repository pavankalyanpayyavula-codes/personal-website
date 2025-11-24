import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import { getHomeData } from '../services/dataService';
import '../styles/Home.css';

const Home = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    document.title = 'About | Pavan Kalyan';
    const fetchData = async () => {
      const data = await getHomeData();
      setHomeData(data);
    };
    fetchData();
  }, []);

  if (!homeData) return <div className="loading-spinner"></div>;

  const { skills, education, interests } = homeData;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="home-container">
      <FadeIn className="home-header">
        <h1>About Me</h1>
        <p>
          Senior Software Engineer passionate about creating exceptional web experiences
          and solving complex technical challenges.
        </p>
      </FadeIn>

      <FadeIn className="profile-section" delay={0.2}>
        <div className="profile-image">
          <img src={homeData.profileImage} alt="Pavan Kalyan" />
        </div>
        <div className="profile-content">
          <h2>Hello, I'm Pavan Kalyan</h2>
          <p>
            With over 5 years of experience in frontend development, I've had the privilege of working
            with industry leaders like Apple, Rakuten, and Cognizant. My expertise lies in building
            scalable web applications using modern technologies and best practices.
          </p>
          <p>
            Currently working at Apple Inc. on the Maps web application, where I focus on
            implementing micro frontend architecture and optimizing performance for millions of users
            worldwide.
          </p>
        </div>
      </FadeIn>

      <FadeIn className="skills-section" delay={0.3}>
        <h2>Skills & Expertise</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              className="skill-card"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.3 + (index * 0.1) }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-description">{skill.description}</p>
              <div className="skill-list">
                {skill.skills.map(item => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="education-section" delay={0.4}>
        <h2>Education</h2>
        <div className="education-grid">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className="education-card"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.4 + (index * 0.1) }}
            >
              <div className="education-year">{edu.year}</div>
              <h3 className="education-degree">{edu.degree}</h3>
              <div className="education-school">{edu.school}</div>
              <p className="education-description">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="interests-section" delay={0.5}>
        <h2>Interests & Hobbies</h2>
        <div className="interests-grid">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              className="interest-item"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.5 + (index * 0.1) }}
            >
              <div className="interest-icon">{interest.icon}</div>
              <div className="interest-title">{interest.title}</div>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
};

export default Home;