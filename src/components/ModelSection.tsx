// components/ModelSection.tsx
import React from 'react';

const ModelSection: React.FC = () => {
  return (
    <section className="model-section bg-gradient-to-br from-[rgba(124,92,255,0.15)] to-[rgba(0,209,255,0.1)] mt-16 animate-[fadeUp_1s_ease]" id="models">
      <div className="container">
        <h2>Pick the Best Characteristics of Each AI Model</h2>
        <div className="model-grid">
          <div className="model-card"><h3>🤖 GPT-Style Models</h3><p>Great for natural conversations, brainstorming, and long-form content.</p></div>
          <div className="model-card"><h3>⚡ Fast Lightweight Models</h3><p>Optimized for speed and efficiency, perfect for instant answers.</p></div>
          <div className="model-card"><h3>🎨 Creative Models</h3><p>Generate unique stories, poems, or marketing ideas with imagination.</p></div>
          <div className="model-card"><h3>📊 Analytical Models</h3><p>Excels at parsing data, calculations, and delivering accurate insights.</p></div>
        </div>
      </div>
    </section>
  );
};

export default ModelSection;