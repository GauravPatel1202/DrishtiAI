// components/LandingPage.tsx
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CTABanner from '../components/CTABanner';
import ModelSection from '../components/ModelSection';
import AIShowcase from '../components/AIShowcase';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import YoutubeSection from './Component/youtube';
const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <CTABanner />
      <AIShowcase />
      <ModelSection />
      <YoutubeSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
