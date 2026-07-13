import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingpageCard from '../components/landing/LandingpageCard'; // LandingpageCard ko import karein
import ResearchLandingPage from '../components/RnP/ResearchLandingPage'; // ResearchLandingPage ko import karein
import RP_U_RegistrationForm from '../components/RnP/RP_U_RegistrationForm';
import RP_U_Login from '../components/RnP/RP_U_Login';
import ResearchGuidance from '../components/RnP/ResearchGuidance';

function RP_Routes() {
  return (
    <Routes>
      <Route path="/" element={<LandingpageCard />} />
      <Route path="/research-publication-guidance"element={<ResearchLandingPage />}/>
      <Route path="/rp_u_registrationform" element={<RP_U_RegistrationForm />} />
      <Route path="/rp_u_login" element={<RP_U_Login />} />
      <Route path="/research-guidance" element={<ResearchGuidance/>} />
    </Routes>
  );
}

export default RP_Routes;
