import express from "express";
import adminRout from "./admin/admin.mjs";
import doctorsRout from "./doctors/doctors.mjs";
import patientRout from "./patient/patient.mjs";
const hspRout = express();
hspRout.use("/api", adminRout);
hspRout.use("/api", doctorsRout);
hspRout.use("/api", patientRout);

// exporting rout

export default hspRout;
