// components/AboutSection.tsx
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2 className="section-title">About Our Team</h2>
        <div className="about-grid">
          <div>
            <h3>Our Mission</h3>
            <p>At LuminaAI (DrishtiAI), we believe in democratizing access to cutting-edge AI technology. Our mission is to make AI tools accessible, affordable, and powerful for everyone—from individual creators to enterprise teams.</p>
            <p>Founded in 2023, we've grown from a small research project to a platform serving thousands of users worldwide, all united by a passion for innovation and the transformative power of artificial intelligence.</p>
          </div>
          <div>
            <h3>Our Values</h3>
            <ul>
              <li>Innovation through simplicity</li>
              <li>Transparency in AI development</li>
              <li>User privacy and data security</li>
              <li>Accessibility across all skill levels</li>
              <li>Continuous learning and improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;