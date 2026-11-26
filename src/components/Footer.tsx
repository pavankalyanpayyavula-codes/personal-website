import { Link } from 'react-router-dom';
import { contact, navigation } from '../data';
import SocialIcon from './SocialIcon';
import '../styles/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-cta">
        <p className="footer-heading">Have a role or project in mind?</p>
        <Link to="/contact" className="text-link">
          Let&apos;s talk →
        </Link>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Pavan Kalyan Payyavula</p>
        <ul className="footer-nav" aria-label="Footer">
          {navigation.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <ul className="footer-social">
          <li>
            <a href={`mailto:${contact.email}`} aria-label="Email">
              <SocialIcon name="email" />
            </a>
          </li>
          {contact.socials.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                <SocialIcon name={s.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
