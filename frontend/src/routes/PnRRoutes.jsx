import React from "react";
import { Routes, Route } from "react-router-dom";

//import PnRFooter from "../components/PnR/PnRFooter";
import PnRHome from "../components/pnr/PnRHome";
import PnRJobDetails from "../components/pnr/PnRJobDetails";
import PnRJobs from "../components/pnr/PnRJobs";
import PnRLeftSidebar from "../components/pnr/PnRLeftSidebar";
import PnRNavbar from "../components/pnr/PnRNavbar";
import PnRNotifications from "../components/pnr/PnRNotifications";
import PnRRightSidebar from "../components/pnr/PnRRightSidebar";
import PnRTrainings from "../components/pnr/PnRTrainings";
import PnRRegister from "../components/pnr/PnRRegister"; // Register component import kiya
import PnRLogin from "../components/pnr/PnRLogin"; // Login component import kiya
import PnRJobForm from "../components/pnr/PnRJobForm"; // Job Form component import kiya

const PnRRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/p&rhome" element={<PnRHome />} />
        <Route path="/p&rnavbar" element={<PnRNavbar />} />
        <Route path="/p&rleftsidebar" element={<PnRLeftSidebar />} />
        <Route path="/p&rrightsidebar" element={<PnRRightSidebar />} />
        <Route path="/p&rnotification" element={<PnRNotifications />} />
        <Route path="/p&rjobdetails/:jobType/:jobId" element={<PnRJobDetails />} />
        <Route path="/p&rjobs" element={<PnRJobs />} />
        <Route path="/p&rtraining" element={<PnRTrainings />} />
        <Route path="/p&rregister" element={<PnRRegister />} /> {/* Naya Route */}
        <Route path="/p&rlogin" element={<PnRLogin />} /> {/* Naya Route */}
        <Route path="/p&rjobform" element={<PnRJobForm />} /> {/* Naya Route */}
      </Routes>
    </>
  );
};

export default PnRRoutes;