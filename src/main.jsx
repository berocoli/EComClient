import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure you are importing from 'react-dom/client' for React 18
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import FormComponent from './signupComponent/signup';
import LoginComponent from './loginComponent/login';
import ErrorBoundary from './errorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<FormComponent />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
