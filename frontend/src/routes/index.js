// src/routes/index.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../components/App';
import UserPage from '../pages/UserPage';
import SocketIoPage from '../pages/SocketIoPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/socketio" element={<SocketIoPage />} />
        <Route path="/user/:username" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
