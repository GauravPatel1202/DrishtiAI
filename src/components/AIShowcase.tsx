// components/AIShowcase.tsx
import React from 'react';

const AIShowcase: React.FC = () => {
  return (
    <section className="ai-showcase " id="ai-showcase">
      <div className="container">
        <h2 className="section-title">Pick the Best Characteristics of Each AI Model</h2>
        <div className="ai-grid">
          {/* Left column */}
          <div className="ai-column">
            <div className="ai-card">
              <h3>ChatGPT 5</h3>
              <span className="badge">All Rounder Explainer</span>
              <p>Great for questions, brainstorming, and clear step-by-step explanations.</p>
            </div>
            <div className="ai-card">
              <h3>Claude Sonnet 4</h3>
              <span className="badge">Co-Writing Master</span>
              <p>Refines polished emails, essays, and scripts while keeping your style.</p>
            </div>
            <div className="ai-card">
              <h3>Gemini 2.5 Pro</h3>
              <span className="badge">Long Context Master</span>
              <p>Handles long documents and images, tracking full context and details.</p>
            </div>
          </div>

          {/* Center glowing logo */}
          <div className="ai-center">
            <div className="glow-circle">✨</div>
          </div>

          {/* Right column */}
          <div className="ai-column">
            <div className="ai-card">
              <h3>Perplexity Sonar Pro</h3>
              <span className="badge">Live Web Researcher</span>
              <p>Delivers fresh answers and news from credible, real-time sources.</p>
            </div>
            <div className="ai-card">
              <h3>DeepSeek</h3>
              <span className="badge">Reasoning Specialist</span>
              <p>Excels at logic, math, and coding with clear, detailed solutions.</p>
            </div>
            <div className="ai-card">
              <h3>Grok 4</h3>
              <span className="badge">Creative Powerhouse</span>
              <p>Bold, unconventional ideas and punchy copy for trend-focused content.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;