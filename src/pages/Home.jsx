import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Home.css';

const Home = () => {
  useEffect(() => {
    document.title = 'About | Pavan Kalyan';
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const skills = [
    {
      icon: '💻',
      title: 'Frontend Development',
      description: 'Building responsive and performant web applications with modern technologies.',
      skills: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Redux', 'GraphQL']
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user interfaces with attention to detail.',
      skills: ['CSS3', 'Sass', 'Tailwind', 'Framer Motion', 'Material-UI', 'Styled Components']
    },
    {
      icon: '⚙️',
      title: 'Backend Integration',
      description: 'Connecting frontend applications with robust backend services.',
      skills: ['RESTful APIs', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Firebase']
    },
    {
      icon: '🚀',
      title: 'Performance & DevOps',
      description: 'Optimizing applications for speed and implementing CI/CD pipelines.',
      skills: ['Webpack', 'Docker', 'Jenkins', 'AWS', 'Git', 'GitHub Actions']
    }
  ];

  const education = [
    {
      year: '2015 - 2019',
      degree: 'Bachelor of Technology in Electronics and Communication Engineering',
      school: 'Jawaharlal Nehru Technological University - Kakinada',
      description: 'Graduated with distinction, focusing on software engineering and web technologies.'
    },
    {
      year: '2013 - 2015',
      degree: 'Intermediate Education (MPC)',
      school: 'Siddartha Junior College',
      description: 'Completed with 97.7% aggregate in Mathematics, Physics, and Chemistry.'
    }
  ];

  const interests = [
    { icon: '🎮', title: 'Gaming' },
    { icon: '📚', title: 'Reading' },
    { icon: '✈️', title: 'Traveling' },
    { icon: '🏏', title: 'Cricket' },
    { icon: '🏸', title: 'Badminton' },
    { icon: '🎵', title: 'Music' },
    { icon: '🏃', title: 'Fitness' }
  ];

  return (
    <div className="home-container">
      <motion.div 
        className="home-header"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <h1>About Me</h1>
        <p>
          Senior Software Engineer passionate about creating exceptional web experiences 
          and solving complex technical challenges.
        </p>
      </motion.div>

      <motion.div 
        className="profile-section"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        <div className="profile-image">
          <img src="https://placehold.co/600x600/png" alt="Pavan Kalyan" />
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
      </motion.div>

      <motion.div 
        className="skills-section"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.3 }}
      >
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
      </motion.div>

      <motion.div 
        className="education-section"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.4 }}
      >
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
      </motion.div>

      <motion.div 
        className="interests-section"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.5 }}
      >
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
      </motion.div>
    </div>
  );
};

export default Home;