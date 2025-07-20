import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/CareerPage.css';

const CareerPage = () => {
  useEffect(() => {
    document.title = 'Career | Pavan Kalyan';
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const experiences = [
    {
      company: 'Apple Inc.',
      title: 'Senior Software Engineer',
      date: 'Jan 2025 - Present',
      location: 'Cupertino, CA',
      description: 'Leading frontend development for Apple Maps web application.',
      achievements: [
        'Engineered critical features using micro frontend architecture, increasing deployment frequency by 20%',
        'Designed reusable UI components reducing code duplication by 15%',
        'Enhanced inter-module communication efficiency by 10%',
        'Optimized frontend performance achieving 5% decrease in load time'
      ],
      skills: ['React', 'TypeScript', 'Micro Frontends', 'GraphQL']
    },
    {
      company: 'Rakuten',
      title: 'Senior Software Engineer I',
      date: 'Mar 2022 - Jan 2025',
      location: 'Tokyo, Japan',
      description: 'Led frontend development and performance optimization initiatives.',
      achievements: [
        'Enhanced React.js application performance by 78% through optimization',
        'Implemented Okta authentication for 24,000+ users',
        'Improved user satisfaction by 30% through UI/UX enhancements',
        'Migrated to Webpack 5, increasing development efficiency by 25%',
        'Reduced deployment time by 40% through CI/CD improvements',
        'Achieved 98% accessibility score through responsive design'
      ],
      skills: ['React', 'Webpack', 'Okta', 'Jenkins', 'Bitbucket']
    },
    {
      company: 'Cognizant Technology Solutions',
      title: 'Programmer Analyst',
      date: 'Jan 2020 - Mar 2022',
      location: 'Hyderabad, India',
      description: 'Developed and maintained React applications for JPMC.',
      achievements: [
        'Increased user engagement by 30% through responsive design',
        'Accelerated project delivery by 20% with improved practices',
        'Reduced load times by 40% through optimization',
        'Enhanced data retrieval times by 25%'
      ],
      skills: ['React', 'Bootstrap', 'Sass', 'RESTful APIs']
    }
  ];

  const achievements = [
    {
      icon: '💼',
      title: '5+ Years',
      description: 'Professional Experience'
    },
    {
      icon: '🚀',
      title: '20+ Projects',
      description: 'Successfully Delivered'
    },
    {
      icon: '⭐',
      title: '98% Success',
      description: 'Client Satisfaction Rate'
    },
    {
      icon: '💡',
      title: '10+ Technologies',
      description: 'Mastered & Implemented'
    }
  ];

  return (
    <div className="career-container">
      <motion.div 
        className="career-header"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <h1>Professional Journey</h1>
        <p>
          A track record of delivering innovative solutions and driving technical excellence 
          in frontend development across industry-leading companies.
        </p>
      </motion.div>

      <motion.div 
        className="timeline"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.company}
            className="timeline-item"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition, delay: 0.2 * index }}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">{exp.date}</div>
              <h3 className="timeline-title">{exp.title}</h3>
              <div className="timeline-company">{exp.company} • {exp.location}</div>
              <p className="timeline-description">{exp.description}</p>
              
              <ul className="timeline-achievements">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>

              <div className="skills-list">
                {exp.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="achievements"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.4 }}
      >
        <h2>Key Achievements</h2>
        <div className="achievement-grid">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index}
              className="achievement-card"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.4 + (index * 0.1) }}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-description">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CareerPage; 