import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { getNavigation } from '../services/dataService';

const Layout = () => {
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    const fetchNav = async () => {
      const links = await getNavigation();
      setNavLinks(links);
    };
    fetchNav();
  }, []);

  return (
    <>
      <Navbar links={navLinks} />
      <main className="main-content">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout; 