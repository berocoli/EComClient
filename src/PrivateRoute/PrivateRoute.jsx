import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAdmin }) => {
  return isAdmin ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
