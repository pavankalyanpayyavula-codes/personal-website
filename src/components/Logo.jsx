import React from 'react';
import '../styles/Logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <div className="logo-icon">
        <div className="logo-squares">
          <div className="square square-1"></div>
          <div className="square square-2"></div>
          <div className="square square-3"></div>
        </div>
        <span className="logo-letter">P</span>
        <div className="logo-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
        </div>
        <div className="logo-dot"></div>
      </div>
      <div className="logo-text">
        <span className="first-name">Pavan</span>
        <span className="last-name">Kalyan</span>
      </div>
    </div>
  );
};

export default Logo; 