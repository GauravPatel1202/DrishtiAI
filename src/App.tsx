import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage';
import AI from './ai';
import { IntlProvider } from 'react-intl/index';
import enMessages from './translations/en.json';

const App: React.FC = () => {
  const locale = 'en';
  const messages = enMessages ?? {};
  return (
    <IntlProvider locale={locale} messages={messages}>
      <Router>
        <Routes>
          <Route path="/ai-app" element={<AI />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </IntlProvider>
  );
};

export default App;

