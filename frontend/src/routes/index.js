// src/routes/index.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Setup from '../pages/Setup';
import Chat from '../pages/Chat';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Setup />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
