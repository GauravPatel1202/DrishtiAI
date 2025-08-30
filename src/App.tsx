import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import LandingPage from './landingPage';
import AI, { ProtectedRoute } from './ai';
import { IntlProvider } from 'react-intl/index';
import enMessages from './translations/en.json';
import Login from './modules/login/login';
import Register from './modules/register/register';
import { AuthProvider } from './AuthContext';
import AIFiestaClone from './ai';

const App: React.FC = () => {
  const locale = 'en';
  const messages = enMessages ?? {};
  return (
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/app/*" element={
              <ProtectedRoute>
                <AIFiestaClone />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;


