// components/LandingPage.tsx
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CTABanner from '../components/CTABanner';
import ModelSection from '../components/ModelSection';
import AIShowcase from '../components/AIShowcase';
import AboutSection from '../components/AboutSection';
import DonationSection from '../components/DonationSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <CTABanner />
      <ModelSection />
      <AIShowcase />
      <AboutSection />
      <DonationSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;