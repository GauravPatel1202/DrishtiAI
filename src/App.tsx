import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage';

// Additional Pages (for demonstration)
const AboutPage: React.FC = () => {
  return (
    <div >
      <h1>About Us</h1>
      <p>This is the about page.</p>
    </div>
  );
};

const ContactPage: React.FC = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>This is the contact page.</p>
    </div>
  );
};

// Navigation Component
const Navigation: React.FC = () => {
  return (
    <></>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router >
  );
};

export default App;

