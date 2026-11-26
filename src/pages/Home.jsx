import FadeIn from '../components/FadeIn';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { home, careerStartYear } from '../data';
import '../styles/Home.css';

const Home = () => {
  useDocumentTitle('About');
  const years = new Date().getFullYear() - careerStartYear;
  const { skills, education, interests } = home;

  return (
    <div className="page container about">
      <FadeIn className="page-header">
        <span className="eyebrow">About</span>
        <h1>Hello, I&apos;m Pavan.</h1>
        <p>Front-end engineer with {years}+ years building React and TypeScript applications, currently leading a team of four.</p>
      </FadeIn>

      <section className="bio">
        <FadeIn className="bio-photo">
          <img src={home.profileImage} alt="Pavan Kalyan in the mountains" width="720" height="720" loading="lazy" />
        </FadeIn>
        <FadeIn className="bio-text" delay={0.1}>
          <p>
            Today I lead a team of four frontend engineers building Apple Maps review tools at
            Payoda Technologies. It&apos;s a React and TypeScript codebase where reviewers check
            landmarks, speed limits, narrow roads and other map features before they reach production.
          </p>
          <p>
            Before that I spent nearly three years at Rakuten making a large React app faster and moving
            its sign-in to Okta, and two years at Cognizant building a digital banking front end for
            JPMorgan Chase.
          </p>
          <p>
            Most of my work sits where product and platform meet: shared component systems, performance,
            and the tooling that helps a team ship with confidence.
          </p>
        </FadeIn>
      </section>

      <section className="section">
        <FadeIn className="section-title"><h2>Skills &amp; expertise</h2></FadeIn>
        <div className="skill-grid">
          {skills.map((skill, i) => (
            <FadeIn key={skill.title} className="card skill-card" delay={i * 0.05}>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <div className="tags">
                {skill.skills.map((item) => <span key={item} className="tag">{item}</span>)}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section">
        <FadeIn className="section-title"><h2>Education</h2></FadeIn>
        <ul className="edu-list">
          {education.map((edu) => (
            <FadeIn as="li" key={edu.degree} className="edu-item">
              <span className="edu-year">{edu.year}</span>
              <div>
                <h3>{edu.degree}</h3>
                <p className="edu-school">{edu.school}</p>
                <p>{edu.description}</p>
              </div>
            </FadeIn>
          ))}
        </ul>
      </section>

      <section className="section">
        <FadeIn className="section-title"><h2>Outside work</h2></FadeIn>
        <FadeIn as="ul" className="interests">
          {interests.map((it) => (
            <li key={it.title}>
              <span aria-hidden="true">{it.icon}</span> {it.title}
            </li>
          ))}
        </FadeIn>
      </section>
    </div>
  );
};

export default Home;
