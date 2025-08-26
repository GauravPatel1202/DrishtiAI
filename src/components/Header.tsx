// components/Header.tsx
import React from 'react';
import { Logo } from './logo';
import { useIntl } from 'react-intl/index';
import I18nKey from '../lib/I18nKey';

const Header: React.FC = () => {
  const intl = useIntl();
  return (
    <header className="sticky top-0 left-0 right-0 z-50 backdrop-saturate-150 backdrop-blur-md bg-[rgba(11,13,16,0.85)] border-b border-[rgba(255,255,255,0.08)] animate-[fadeDown_0.7s_ease_forwards]">
      <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between gap-4 py-3.5">
        <Logo />
        {/* Hamburger icon for mobile */}
        <div className="hamburger" onClick={() => {
          const navlinks = document.querySelector('.navlinks');
          if (navlinks) navlinks.classList.toggle('active');
        }}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <nav className="navlinks flex gap-4 items-center">
          <a className="navlinksHide py-2 px-3 rounded-lg text-[#a5afc7] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#e6e8ee] transition-colors duration-300" href="#features">{intl.formatMessage({
            id: I18nKey.FEATURES,
          })}</a>
          <a className="navlinksHide py-2 px-3 rounded-lg text-[#a5afc7] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#e6e8ee] transition-colors duration-300" href="#use-cases">Use cases</a>
          <a className="navlinksHide py-2 px-3 rounded-lg text-[#a5afc7] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#e6e8ee] transition-colors duration-300" href="#pricing">Pricing</a>
          <a className="navlinksHide py-2 px-3 rounded-lg text-[#a5afc7] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#e6e8ee] transition-colors duration-300" href="#about">About</a>
          <a className="navlinksHide py-2 px-3 rounded-lg text-[#a5afc7] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#e6e8ee] transition-colors duration-300" href="#faq">FAQ</a>
          <a className="btn btn-ghost py-3 px-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 border border-[rgba(255,255,255,0.16)] text-[#e6e8ee] hover:bg-[rgba(255,255,255,0.08)]" href="#signup">Sign in</a>
          <a className="btn btn-primary py-3 px-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] text-[#0b0d10] shadow-lg shadow-[rgba(124,92,255,0.25)] hover:translate-y-[-3px] hover:scale-105 hover:shadow-xl hover:shadow-[rgba(124,92,255,0.4)]" href="ai-app">Get started</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;