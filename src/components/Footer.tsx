// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
      <footer className="bg-[#0a0c0f] py-10 px-5 text-center border-t border-[rgba(255,255,255,0.08)] mt-16">
          <div className="links flex justify-center gap-6 flex-wrap mb-4">
              <a className="text-[#a5afc7] text-sm hover:text-[#e6e8ee] transition-colors duration-300" href="#features">Features</a>
              <a className="text-[#a5afc7] text-sm hover:text-[#e6e8ee] transition-colors duration-300" href="#pricing">Pricing</a>
              <a className="text-[#a5afc7] text-sm hover:text-[#e6e8ee] transition-colors duration-300" href="#about">About</a>
              <a className="text-[#a5afc7] text-sm hover:text-[#e6e8ee] transition-colors duration-300" href="#donate">Donate</a>
              <a className="text-[#a5afc7] text-sm hover:text-[#e6e8ee] transition-colors duration-300" href="#faq">FAQ</a>
              <a className="text-[#a5afc7] text-sm hover:text-[#e6e8ee] transition-colors duration-300" href="#signup">Sign up</a>
          </div>
          <p className="text-[#a5afc7] text-sm">&copy; 2025 LuminaAI (DrishtiAI). All rights reserved.</p>
      </footer>
  );
};

export default Footer;