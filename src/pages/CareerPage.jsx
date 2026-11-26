import FadeIn from '../components/FadeIn';
import useDocumentTitle from '../hooks/useDocumentTitle';
import SocialIcon from '../components/SocialIcon';
import { career, contact } from '../data';
import '../styles/CareerPage.css';

const CareerPage = () => {
  useDocumentTitle('Career');
  const { skills, experiences, awards, certifications } = career;

  return (
    <div className="page container career">
      <FadeIn className="page-header">
        <span className="eyebrow">Career</span>
        <h1>Experience</h1>
        <p>Where I&apos;ve worked, what I built there, and the recognition along the way.</p>
        <a href={contact.resume.url} download={contact.resume.fileName} className="btn btn-primary resume-btn">
          <SocialIcon name="download" /> Download résumé (PDF)
        </a>
      </FadeIn>

      <ol className="timeline">
        {experiences.map((exp) => (
          <FadeIn as="li" key={`${exp.company}-${exp.period}`} className="role">
            <div className="role-meta">
              <span className="role-period">{exp.period}</span>
              <span className="role-location">{exp.location}</span>
            </div>
            <div className="role-body">
              <h2 className="role-title">{exp.title}</h2>
              <p className="role-company">{exp.company}</p>
              <p className="role-summary">{exp.description}</p>
              <ul className="role-achievements">
                {exp.achievements.map((a) => <li key={a}>{a}</li>)}
              </ul>
              <div className="tags">
                {exp.skills.map((s) => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          </FadeIn>
        ))}
      </ol>

      <section className="section">
        <FadeIn className="section-title"><h2>Skills</h2></FadeIn>
        <dl className="skill-table">
          {Object.entries(skills).map(([category, list]) => (
            <FadeIn key={category} className="skill-row">
              <dt>{category}</dt>
              <dd className="tags">
                {list.map((s) => <span key={s} className="tag">{s}</span>)}
              </dd>
            </FadeIn>
          ))}
        </dl>
      </section>

      <section className="section">
        <FadeIn className="section-title"><h2>Awards</h2></FadeIn>
        <div className="award-grid">
          {awards.map((award, i) => (
            <FadeIn key={award.title} className="card award" delay={i * 0.05}>
              <span className="award-year">{award.year}</span>
              <h3>{award.title}</h3>
              <p className="award-org">{award.company}</p>
              <p>{award.description}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section">
        <FadeIn className="section-title"><h2>Certifications</h2></FadeIn>
        <ul className="cert-list">
          {certifications.map((cert) => {
            const hasLink = cert.link && cert.link !== '#';
            return (
              <FadeIn as="li" key={cert.name} className="cert">
                <div>
                  <h3>
                    {hasLink ? (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-link">
                        {cert.name}
                      </a>
                    ) : cert.name}
                  </h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                </div>
                <span className="cert-id">{cert.date}</span>
              </FadeIn>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default CareerPage;
