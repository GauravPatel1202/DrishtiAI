// components/Hero.tsx
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="badge">🚀 New: Workflow Builder now in beta</span>
          <h1>Build, ship, and scale with AI— in minutes.</h1>
          <p className="lead">An elegant, production-ready landing page template for AI tools and startups. No JS required.</p>
          <div className="cta">
            <a className="btn btn-primary" href="#pricing">Start free</a>
            <a className="btn btn-ghost" href="#features">See features</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;