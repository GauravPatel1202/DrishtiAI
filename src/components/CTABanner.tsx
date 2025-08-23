// components/CTABanner.tsx
import React from 'react';

const CTABanner: React.FC = () => {
  return (
      <section className="cta-banner py-24 px-5 text-center bg-gradient-to-br from-[rgba(124,92,255,0.15)] to-[rgba(0,209,255,0.1)] mt-16 animate-[fadeUp_1s_ease]">
          <div className="max-w-[1200px] mx-auto">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">Ready to experience smarter & more accurate AI answers?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">Unlock the full power of LuminaAI (DrishtiAI) with cutting-edge AI models, seamless workflows, and unlimited conversations.</p>
              <a href="ai-app" className="inline-block py-3 px-6 rounded-xl font-semibold cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] text-[#0b0d10] shadow-lg shadow-[rgba(124,92,255,0.25)] hover:translate-y-[-3px] hover:scale-105 hover:shadow-xl hover:shadow-[rgba(124,92,255,0.4)]">Get Started Now</a>
          </div>
      </section>
  );
};

export default CTABanner;