import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingRoutes from "./routes/LandingRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import MasteradminRoutes from "./routes/MasteradminRoutes";
import PnRRoutes from "./routes/PnRRoutes";
import RP_Routes from "./routes/RP_Routes";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Root Landing Routes */}
        <Route path="/*" element={<LandingRoutes />} />

        {/* Authentication Routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Master Admin Routes */}
        <Route path="/master/*" element={<MasteradminRoutes />} />

        {/* PNR Routes */}
        <Route path="/modulei/*" element={<PnRRoutes/>}/>

        {/* R&P Routes */}
        <Route path="/moduleii/*" element={<RP_Routes/>}/>
      </Routes>
    </Router>
  );
};

export default App;




