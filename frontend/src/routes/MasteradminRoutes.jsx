import React from "react";
import { Routes, Route } from "react-router-dom";
import MasterDashboard from "../components/masteradmin/MasterDashboard";
import MasterModulesManagement from "../components/masteradmin/MasterModulesManagement";
import MasterJobsManagement from "../components/masteradmin/MasterJobsManagement";
import MasterCoursesManagement from "../components/masteradmin/MasterCoursesManagement";
import MasterPaymentsManagement from "../components/masteradmin/MasterPaymentsManagement";
import MasterSubadminManagement from "../components/masteradmin/MasterSubadminManagement";
import MasterReports from "../components/masteradmin/MasterReports";
import MasterNotifications from "../components/masteradmin/MasterNotifications";
import MasterSidebar from "../components/masteradmin/MasterSidebar";
import MasterHeader from "../components/masteradmin/MasterHeader";
import MasterAddNewJob from "../components/masteradmin/MasterAddNewJob";
import MasterEditJob from "../components/masteradmin/MasterEditJob"; // newly added

const MasteradminRoutes = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Header */}
      <MasterHeader />
      {/* Sidebar */}
      <MasterSidebar />

      {/* Main Content */}
      <div style={{ marginLeft: "5px", padding: "5px", width: "100%" }}>
        <Routes>
          <Route path="admin-dashboard" element={<MasterDashboard />} />
          <Route path="modulesmanagement" element={<MasterModulesManagement />} />

          {/* Nest the jobsmanagement routes */}
          <Route path="jobsmanagement/*" element={<MasterJobsManagement />}>
            <Route path="add-new-job" element={<MasterAddNewJob />} />
            <Route path="edit/:id" element={<MasterEditJob />} />
          </Route>

          <Route path="coursesmanagement" element={<MasterCoursesManagement />} />
          <Route path="paymentsmanagement" element={<MasterPaymentsManagement />} />
          <Route path="subadminmanagement" element={<MasterSubadminManagement />} />
          <Route path="reports" element={<MasterReports />} />
          <Route path="notifications" element={<MasterNotifications />} />
        </Routes>
      </div>
    </div>
  );
};

export default MasteradminRoutes;
