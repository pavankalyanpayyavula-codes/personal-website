import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import { getCareerData } from '../services/dataService';
import '../styles/CareerPage.css';

const CareerPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    document.title = 'Career | Pavan Kalyan';
    const fetchData = async () => {
      const careerData = await getCareerData();
      setData(careerData);
    };
    fetchData();
  }, []);

  if (!data) return <div className="loading-spinner"></div>;

  const { skills, experiences, awards, certifications } = data;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="career-container">
      <FadeIn className="career-header">
        <h1>Career Journey</h1>
        <p>Exploring my professional path and achievements</p>
      </FadeIn>

      <div className="career-content">
        <FadeIn className="experience-section" delay={0.1}>
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
        </FadeIn>

        <FadeIn className="skills-section" delay={0.2}>
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
        </FadeIn>

        <FadeIn className="awards-section" delay={0.3}>
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
        </FadeIn>

        <FadeIn className="certifications-section" delay={0.4}>
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
        </FadeIn>
      </div>
    </div>
  );
};

export default CareerPage;
