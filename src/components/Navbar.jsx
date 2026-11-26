import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import '../styles/Navbar.css';

const Navbar = ({ links = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setIsOpen(false), [pathname]);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <header className={`navbar ${isScrolled || isOpen ? 'is-raised' : ''}`}>
      <nav className="navbar-inner container" aria-label="Main">
        <Link to="/" className="navbar-logo" aria-label="Pavan Kalyan, home">
          <Logo />
        </Link>

        <button
          type="button"
          className={`menu-toggle ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="primary-nav"
        >
          <span className="visually-hidden">{isOpen ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <ul id="primary-nav" className={`nav-links ${isOpen ? 'is-open' : ''}`}>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
