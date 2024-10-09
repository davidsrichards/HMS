import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Contents from "./Dashboard/Contents/Contents";
import ManageDoctor from "./Dashboard/Contents/Management/ManageDoctors/ManageDoctors";
import DoctorsReg from "./Dashboard/Contents/Registration/Doctors/DoctorsReg/DoctorsReg";
import PatientReg from "./Dashboard/Contents/Patient/RegisterPatient/RegisterPatient";
import ManagePatient from "./Dashboard/Contents/Patient/RegisterPatient/ManagePatient/ManagePatient";
import ManageAdmin from "./Dashboard/Contents/Admin/ManageAdmin";
import BarChart from "./Dashboard/Contents/Chat/Cart";

function Component() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="content" element={<Contents />} />
        <Route path="manage-doctor" element={<ManageDoctor />} />
        <Route path="doctor-registration" element={<DoctorsReg />} />
        <Route path="manage-patient" element={<ManagePatient />} />
        <Route path="patient-registration" element={<PatientReg />} />
        <Route path="manage-admin" element={<ManageAdmin />} />
        <Route path="chart" element={<BarChart />} />
        <Route index element={<BarChart />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default Component;
