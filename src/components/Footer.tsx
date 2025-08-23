// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="links">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
        <a href="#donate">Donate</a>
        <a href="#faq">FAQ</a>
        <a href="#signup">Sign up</a>
      </div>
      <p>&copy; 2025 LuminaAI (DrishtiAI). All rights reserved.</p>
    </footer>
  );
};

export default Footer;