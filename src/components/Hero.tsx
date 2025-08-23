// components/Hero.tsx
import React from 'react';

const Hero: React.FC = () => {
  return (
      <section className="hero py-24 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
              <div>
                  <span className="inline-block py-1.5 px-4 rounded-lg bg-[rgba(124,92,255,0.15)] text-[#00d1ff] text-sm font-semibold mb-4">🚀 New: Workflow Builder now in beta</span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientMove_6s_linear_infinite]">Build, ship, and scale with AI— in minutes.</h1>
                  <p className="lead text-lg mt-4 text-[#a5afc7]">An elegant, production-ready landing page template for AI tools and startups. No JS required.</p>
                  <div className="cta mt-6 flex gap-4">
                      <a className="btn btn-primary py-3 px-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] text-[#0b0d10] shadow-lg shadow-[rgba(124,92,255,0.25)] hover:translate-y-[-3px] hover:scale-105 hover:shadow-xl hover:shadow-[rgba(124,92,255,0.4)]" href="ai-app">Start free</a>
                      <a className="btn btn-ghost py-3 px-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 border border-[rgba(255,255,255,0.16)] text-[#e6e8ee] hover:bg-[rgba(255,255,255,0.08)]" href="#features">See features</a>
                  </div>
              </div>
          </div>
      </section>
  );
};


export default Hero;