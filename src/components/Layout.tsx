import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { navigation } from '../data';

const Layout = () => {
  const { pathname } = useLocation();

  // Start each page at the top, like a normal site.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar links={navigation} />
      <main id="main" className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
