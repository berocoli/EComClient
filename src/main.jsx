import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import FormComponent from './signupComponent/Signup';
import LoginComponent from './loginComponent/Login';
import AdminComponent from './AdminPage/AdminPageComponent';
import ErrorBoundary from './errorBoundary';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<FormComponent />} />
          <Route
            path="/admin"
            element={<PrivateRoute isAdmin={sessionStorage.getItem('userRole') === 'true'} element={<AdminComponent />} />}
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
