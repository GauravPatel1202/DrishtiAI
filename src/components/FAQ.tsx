// components/FAQ.tsx
import React from 'react';

const FAQ: React.FC = () => {
  return (
    <section className="faq" id="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-grid">
        <details>
          <summary>🔹 What makes LuminaAI (DrishtiAI) different?</summary>
          <p>LuminaAI (DrishtiAI) bundles AI tools in one place with a single subscription.</p>
        </details>
        <details>
          <summary>🔹 Can I toggle AI models during chat?</summary>
          <p>Yes, you can switch between supported AI models instantly.</p>
        </details>
        <details>
          <summary>🔹 Do I get unlimited messaging?</summary>
          <p>Yes! Unlimited conversations with no restrictions.</p>
        </details>
        <details>
          <summary>🔹 What happens when tokens run out?</summary>
          <p>You'll be notified and can upgrade your plan easily.</p>
        </details>
        <details>
          <summary>🔹 Can I request a refund?</summary>
          <p>We offer a 7-day refund policy if you're not satisfied.</p>
        </details>
      </div>
    </section>
  );
};

export default FAQ;