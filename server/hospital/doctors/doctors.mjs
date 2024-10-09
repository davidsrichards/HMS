import express from "express";
import * as controller from "./doctors-controller.mjs";
const doctorsRout = express();

doctorsRout.route("/doctor/register").post(controller.reisterDoctor);
doctorsRout.route("/doctor/get").get(controller.getDoctor);
doctorsRout.route("/doctor/get/all").get(controller.getAllDoctors);
doctorsRout
  .route("/doctor/update/:id")
  .put(controller.getDoctorById, controller.updateDoctor);
doctorsRout
  .route("/doctor/delete/:id")
  .delete(controller.getDoctorById, controller.deleteDoctor);

export default doctorsRout;
