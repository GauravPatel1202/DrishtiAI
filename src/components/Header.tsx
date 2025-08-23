// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  const toggleMenu = () => {
    const navlinks = document.querySelector('.navlinks');
    if (navlinks) navlinks.classList.toggle('active');
  };

  return (
    <header>
      <div className="container nav">
        <a href="#" className="brand">
          <span className="logo" aria-hidden="true"></span>
          <span>LuminaAI (DrishtiAI)</span>
        </a>

        {/* Hamburger icon for mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <nav className="navlinks">
          <a className="navlinksHide" href="#features">Features</a>
          <a className="navlinksHide" href="#use-cases">Use cases</a>
          <a className="navlinksHide" href="#pricing">Pricing</a>
          <a className="navlinksHide" href="#about">About</a>
          <a className="navlinksHide" href="#faq">FAQ</a>
          <a className="btn btn-ghost" href="#signup">Sign in</a>
          <a className="btn btn-primary" href="#signup">Get started</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;