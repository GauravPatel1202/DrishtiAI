import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage';
import AIFiestaClone from './aiModel';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ai-app" element={<AIFiestaClone />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router >
  );
};

export default App;

