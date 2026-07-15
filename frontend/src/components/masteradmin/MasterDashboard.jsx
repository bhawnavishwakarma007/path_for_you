import React from 'react';
import MasterSidebar from './MasterSidebar';
import MasterHeader from './MasterHeader';
import MasterModulesOverview from './MasterModulesOverview';
import MasterPaymentRecords from './MasterPaymentRecords';
import MasterSubadminAccess from './MasterSubadminAccess';
import '../../css/masteradmin/MasterDashboard.css';
import '../../css/masteradmin/MasterHeader.css';
import '../../css/masteradmin/MasterSidebar.css';
import '../../css/masteradmin/MasterModulesOverview.css';
import '../../css/masteradmin/MasterPaymentRecords.css';
import '../../css/masteradmin/MasterSubadminAccess.css';
const MasterDashboard = () => {
  return (
    <>
       <div>
      <MasterHeader /> 
      <div className="dashboard-body"> 
        <MasterSidebar /> 
        <div className="main-content"> 
          <MasterModulesOverview />
          <MasterPaymentRecords />
          <MasterSubadminAccess />
        </div>
      </div>
    </div>

    </>
  )
}

export default MasterDashboard;