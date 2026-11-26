import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import SocialIcon from '../components/SocialIcon';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { home, career, contact, careerStartYear } from '../data';
import '../styles/LandingPage.css';

const LandingPage = () => {
  useDocumentTitle();
  const years = new Date().getFullYear() - careerStartYear;

  const stats = [
    { value: `${years}+`, label: 'years building production web apps' },
    { value: '20+', label: 'feature modules on a component system I designed' },
    { value: '70+', label: 'fixes and features shipped on Apple Maps tools' },
    { value: '4', label: 'engineers I lead and mentor today' },
  ];

  const focus = ['React', 'TypeScript', 'Vue.js', 'Redux Toolkit', 'React Query', 'GraphQL', 'Vite', 'Storybook'];

  return (
    <div className="landing">
      <section className="hero container">
        <FadeIn className="hero-copy">
          <span className="eyebrow">Senior Software Engineer · Hyderabad, India</span>
          <h1>Pavan Kalyan Payyavula</h1>
          <p className="hero-lead">
            Front-end engineer with {years}+ years building React and TypeScript applications. I lead a
            team of four developers on Apple Maps review tools, covering architecture, code review,
            mentoring and technical hiring.
          </p>
          <div className="hero-actions">
            <Link to="/career" className="btn btn-primary">See my work</Link>
            <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
          </div>
          <ul className="hero-social" aria-label="Elsewhere">
            {contact.socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  <SocialIcon name={s.icon} /> {s.name}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="hero-photo" delay={0.1}>
          <img
            src={home.profileImage}
            alt="Pavan Kalyan smiling with arms outstretched in front of green mountains"
            width="720"
            height="720"
            fetchpriority="high"
          />
        </FadeIn>
      </section>

      <section className="container" aria-label="Highlights">
        <FadeIn as="ul" className="stats">
          {stats.map((s) => (
            <li key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </li>
          ))}
        </FadeIn>
      </section>

      <section className="container section">
        <FadeIn className="section-title">
          <h2>Where I&apos;ve worked</h2>
        </FadeIn>
        <ul className="work-list">
          {career.experiences.map((exp, i) => (
            <FadeIn as="li" key={exp.company} delay={i * 0.05} className="work-item">
              <div>
                <h3>{exp.company}</h3>
                <p>{exp.title}</p>
              </div>
              <span className="work-period">{exp.period}</span>
            </FadeIn>
          ))}
        </ul>
        <Link to="/career" className="text-link more-link">Full career history →</Link>
      </section>

      <section className="container section">
        <FadeIn className="focus">
          <h2>What I work with</h2>
          <div className="tags">
            {focus.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

export default LandingPage;
