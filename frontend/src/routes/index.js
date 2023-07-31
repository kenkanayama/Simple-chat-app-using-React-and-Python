import React from 'react';
import { Route, Routes as Router } from 'react-router-dom';
import SocketIoPage from '../pages/SocketIoPage';

const Routes = () => {
  return (
    <Router>
      <Route path="/socketio" element={<SocketIoPage />} />
    </Router>
  );
};

export default Routes;
