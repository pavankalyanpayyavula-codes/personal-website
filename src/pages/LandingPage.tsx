import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import CountUp from '../components/CountUp';
import SocialIcon from '../components/SocialIcon';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { home, career, contact, careerStartYear } from '../data';
import '../styles/LandingPage.css';

// Load the hero photo first. React 18's types don't know `fetchpriority` yet,
// and it must stay lowercase in the DOM, so it's passed as a plain attribute.
const HIGH_PRIORITY = { fetchpriority: 'high' } as Record<string, string>;

// Seconds between each hero line appearing.
const HERO_STEP = 0.08;

const LandingPage = () => {
  useDocumentTitle();
  const years = new Date().getFullYear() - careerStartYear;

  const stats = [
    { value: `${years}+`, label: 'years building production web apps' },
    { value: '20+', label: 'feature modules on a component system I designed' },
    { value: '70+', label: 'fixes and features shipped on Apple Maps tools' },
    { value: '4', label: 'engineers I lead and mentor today' },
  ];

  const focus = [
    'React',
    'TypeScript',
    'Vue.js',
    'Redux Toolkit',
    'React Query',
    'GraphQL',
    'Vite',
    'Storybook',
  ];

  return (
    <div className="landing">
      <section className="hero container">
        <div className="hero-copy">
          <FadeIn>
            <span className="eyebrow">Senior Software Engineer · Hyderabad, India</span>
          </FadeIn>
          <FadeIn delay={HERO_STEP}>
            <h1>Pavan Kalyan Payyavula</h1>
          </FadeIn>
          <FadeIn delay={HERO_STEP * 2}>
            <p className="hero-lead">
              Front-end engineer with {years}+ years building React and TypeScript applications. I
              lead a team of four developers on Apple Maps review tools, covering architecture, code
              review, mentoring and technical hiring.
            </p>
          </FadeIn>
          <FadeIn className="hero-actions" delay={HERO_STEP * 3}>
            <Link to="/career" className="btn btn-primary">
              See my work
            </Link>
            <a
              href={contact.resume.url}
              download={contact.resume.fileName}
              className="btn btn-ghost"
            >
              <SocialIcon name="download" /> Download résumé
            </a>
          </FadeIn>
          <FadeIn delay={HERO_STEP * 4}>
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
        </div>

        <FadeIn className="hero-photo" delay={HERO_STEP * 2}>
          <img
            src={home.profileImage}
            alt="Pavan Kalyan smiling with arms outstretched in front of green mountains"
            width={720}
            height={720}
            {...HIGH_PRIORITY}
          />
        </FadeIn>
      </section>

      <section className="container" aria-label="Highlights">
        <FadeIn as="ul" className="stats">
          {stats.map((s) => (
            <li key={s.label}>
              <CountUp value={s.value} className="stat-value" />
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
        <Link to="/career" className="text-link more-link">
          Full career history →
        </Link>
      </section>

      <section className="container section">
        <FadeIn className="focus">
          <h2>What I work with</h2>
          <div className="tags">
            {focus.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

export default LandingPage;
