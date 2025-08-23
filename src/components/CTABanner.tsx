// components/CTABanner.tsx
import React from 'react';

const CTABanner: React.FC = () => {
  return (
    <section className="cta-banner">
      <div className="container">
        <h2>Ready to experience smarter & more accurate AI answers?</h2>
        <p>Unlock the full power of LuminaAI (DrishtiAI) with cutting-edge AI models, seamless workflows, and unlimited conversations.</p>
        <a href="#signup" className="btn btn-primary">Get Started Now</a>
      </div>
    </section>
  );
};

export default CTABanner;