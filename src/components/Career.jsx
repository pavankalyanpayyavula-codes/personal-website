import React from 'react';
import '../styles/Career.css';

const Career = () => {
  const experiences = [
    {
      company: 'Apple Inc.',
      role: 'Senior Software Engineer',
      period: 'Jan 2025 - Present',
      achievements: [
        'Engineered and maintained critical features for the Apple Maps web application using micro frontend architecture, increasing deployment frequency by 20%.',
        'Designed and implemented reusable UI components and micro frontend modules in React, reducing code duplication across teams by 15%.',
        'Collaborated with engineering teams to integrate micro frontends into the Apple Maps ecosystem, enhancing inter-module communication efficiency by 10%.',
        'Optimized front-end code and resolved performance bottlenecks in Apple Maps, achieving a 5% decrease in average page load time.'
      ]
    },
    {
      company: 'Rakuten',
      role: 'Senior Software Engineer I',
      period: 'Mar 2022 - Jan 2025',
      achievements: [
        'Enhanced React.js application performance by 78% through bundle analysis, optimized images, and tree shaking.',
        'Led integration of Okta for external authentication, improving security for over 24,000 users.',
        'Collaborated with stakeholders to gather requirements and designed interfaces using Figma, improving satisfaction by 30%.',
        'Successfully migrated React.js application from webpack4 to webpack5, increasing development efficiency by 25%.',
        'Implemented CI/CD pipelines with Jenkins and Bitbucket, reducing time to market by 40%.',
        'Achieved 98% accessibility score and reduced initial load time by 50% through responsive design.'
      ]
    },
    {
      company: 'Cognizant Technology Solutions',
      role: 'Programmer Analyst',
      period: 'Jan 2020 - Mar 2022',
      achievements: [
        'Developed responsive React.js web application for JPMC using Bootstrap and Sass, increasing user engagement by 30%.',
        'Enhanced code quality through reviews and documentation, accelerating project delivery by 20%.',
        'Implemented performance optimization techniques, reducing load times by 40%.',
        'Created reusable React components for improved code maintainability.',
        'Collaborated with backend developers to design RESTful APIs, enhancing data retrieval times by 25%.'
      ]
    }
  ];

  return (
    <div className="career-container">
      <h1>Professional Experience</h1>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            <div className="experience-header">
              <h2>{exp.company}</h2>
              <h3>{exp.role}</h3>
              <span className="period">{exp.period}</span>
            </div>
            <ul className="achievements-list">
              {exp.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Career; 