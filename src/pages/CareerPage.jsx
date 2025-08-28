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

  const skills = {
    'Frontend Development': [
      'React', 'Vue.js', 'Redux', 'Vuex', 'Material UI', 'Vuetify'
    ],
    'Programming Languages': [
      'JavaScript', 'TypeScript', 'HTML5', 'CSS3'
    ],
    'Development Tools': [
      'Vite', 'Webpack', 'Git', 'BitBucket', 'VS Code'
    ]
  };

  const experiences = [
    {
      company: 'Apple Inc.',
      title: 'Senior Software Engineer',
      period: 'Jan 2025 - Present',
      location: 'Hyderabad, India',
      description: 'Leading frontend development working for Apple Maps as a vendor from Payoda',
      achievements: [
        'Developed and maintained front-end applications for internal Apple Maps tools used by Reviewers and QC Reviewers to verify and validate map data quality.',
        'Built tools to streamline the review workflow and improve the accuracy of data verification for Apple Maps quality control teams.',
        'Collaborated with cross-functional engineering teams to integrate micro-frontends into the Apple Maps ecosystem, increasing intermodule communication efficiency by 10%.',
        'Optimized code performance and resolved UI bottlenecks, resulting in a 5% reduction in average page load time.'
      ],
      skills: ['React', 'Redux', 'TypeScript', 'Micro Frontends', 'GraphQL']
    },
    {
      company: 'Rakuten',
      title: 'Senior Software Engineer',
      period: 'Mar 2022 - Jan 2025',
      location: 'Bangalore, India',
      description: 'Leading frontend development and performance optimization initiatives.',
      achievements: [
        'Significantly improved the performance of a large-scale React.js application by 78% through comprehensive bundle size analysis, tree shaking, image optimization, and lazy loading techniques, resulting in a faster and smoother user experience.',
        'Successfully led the integration of Okta for secure and seamless user authentication, enhancing the overall login process and improving the application security for over 24,000 users.',
        'Collaborated closely with designers and stakeholders to create modern, intuitive, and accessible user interfaces using Figma, contributing to a 30% increase in overall user satisfaction and engagement.',
        'Spearheaded the migration of the existing codebase from Webpack 4 to Webpack 5, improving build performance, module federation support, and overall development efficiency by 25%.',
        'Achieved an accessibility score of 98% by implementing responsive design principles, semantic HTML, and ARIA best practices, while reducing the initial page load time by 50%, thus improving user experience for all users.'
      ],
      skills: ['React', 'Redux', 'Vite', 'Webpack', 'Okta', 'Jenkins', 'Bitbucket']
    },
    {
      company: 'Cognizant Technology Solutions',
      title: 'Programmer Analyst',
      period: 'Jan 2020 - Mar 2022',
      location: 'Bangalore, India',
      description: 'Developed and maintained React applications for JPMC.',
      achievements: [
        'Developed a highly responsive and accessible front-end application for JPMorgan Chase using React.js and Bootstrap, which enhanced the digital banking experience and led to a 30% increase in customer satisfaction.',
        'Built modular and reusable React components to streamline UI development and reduce duplication, utilizing npm and Yarn for efficient dependency and package management.',
        'Collaborated with back-end engineers and API architects to design and integrate robust RESTful APIs, reducing data retrieval time by 25% and enabling smooth synchronization across services.'
      ],
      skills: ['React', 'Material-UI', 'Bootstrap', 'Sass', 'RESTful APIs']
    }
  ];

  const awards = [
    {
      year: '2024',
      title: 'Best Individual Contributor Award',
      company: 'Rakuten',
      description: 'Recognized for outstanding individual contributions and exceptional performance.'
    },
    {
      year: '2022',
      title: 'Best New Comer Award',
      company: 'Rakuten',
      description: 'Awarded for exceptional performance and quick adaptation as a new team member.'
    },
    {
      year: '2021',
      title: 'The Ultimate Contributor Award',
      company: 'Cognizant',
      description: 'Honored for significant contributions and dedication to project success.'
    }
  ];

  const certifications = [
    {
      name: 'Frontend Developer (React)',
      issuer: 'HackerRank',
      date: '2024',
      link: 'https://www.hackerrank.com/certificates/3b03bd64ba21',
      skills: ['React', 'Frontend Development', 'Web Applications']
    },
    {
      name: 'JavaScript',
      issuer: 'HackerRank',
      date: '2024',
      link: 'https://www.hackerrank.com/certificates/4e52c891b885',
      skills: ['JavaScript', 'Problem Solving', 'Web Development']
    },
    {
      name: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: '2023',
      link: 'https://www.freecodecamp.org/certification/pavankalyanpayyavula/javascript-algorithms-and-data-structures',
      skills: ['JavaScript', 'Data Structures', 'Algorithms', 'Problem Solving']
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
        <h1>Career Journey</h1>
        <p>Exploring my professional path and achievements</p>
      </motion.div>

      <div className="career-content">
        <motion.section 
          className="experience-section"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.1 }}
        >
          <h2>Professional Experience</h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div 
                key={`${exp.company}-${exp.period}`}
                className="timeline-item"
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={{ ...fadeIn.transition, delay: 0.1 * index }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{exp.title}</h3>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <div className="company-info">
                    <span className="company-name">{exp.company}</span>
                    <span className="company-location">{exp.location}</span>
                  </div>
                  <p className="job-description">{exp.description}</p>
                  <ul className="achievements-list">
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
          </div>
        </motion.section>

        <motion.section 
          className="skills-section"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.2 }}
        >
          <h2>Technical Skills</h2>
          <div className="skills-container">
            {Object.entries(skills).map(([category, skillsList], index) => (
              <motion.div 
                key={category}
                className="skill-category"
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={{ ...fadeIn.transition, delay: 0.1 * index }}
              >
                <h3>{category}</h3>
                <div className="skills-list">
                  {skillsList.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="awards-section"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.3 }}
        >
          <h2>Awards & Recognition</h2>
          <div className="awards-grid">
            {awards.map((award, index) => (
              <motion.div 
                key={award.title}
                className="award-card"
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={{ ...fadeIn.transition, delay: 0.1 * index }}
              >
                <div className="award-icon">🏆</div>
                <div className="award-content">
                  <h3>{award.title}</h3>
                  <div className="award-meta">
                    <span className="award-company">{award.company}</span>
                    <span className="award-year">{award.year}</span>
                  </div>
                  <p>{award.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="certifications-section"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.4 }}
        >
          <h2>Certifications</h2>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <motion.div 
                key={cert.name}
                className="certification-card"
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={{ ...fadeIn.transition, delay: 0.1 * index }}
              >
                <div className="cert-icon">📜</div>
                <div className="cert-content">
                  <h3>{cert.name}</h3>
                  <div className="cert-meta">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                  <div className="cert-skills">
                    {cert.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cert-link"
                  >
                    View Certificate →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CareerPage;
