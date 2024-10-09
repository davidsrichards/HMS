import express from "express";
import * as controller from "./patient-controller.mjs";
const patientRout = express();

patientRout.route("/patient/register").post(controller.registerPatient);
patientRout.route("/patient/get/all").get(controller.getAllPatient);
patientRout.route("/patient/get").get(controller.getOnePatient);
patientRout
  .route("/patient/update/:id")
  .put(controller.getPatientById, controller.updatePatient);
patientRout
  .route("/patient/delete/:id")
  .delete(controller.getPatientById, controller.deletePatient);

// export patiet rout
export default patientRout;
