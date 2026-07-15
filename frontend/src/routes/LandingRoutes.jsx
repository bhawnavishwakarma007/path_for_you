import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from '../components/landing/Landingpage';

const LandingRoutes = () => {
  return (
    <>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<Landingpage />} />
      </Routes>
    </>
  );
};

export default LandingRoutes;
