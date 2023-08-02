// src/routes/index.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from '../pages/Chat';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
