import express from "express";
import * as controller from "./admin-cotroller.mjs";
import { getPatientById } from "../patient/patient-controller.mjs";
const adminRout = express();

// methods

adminRout.route("/admin/get").get(controller.getAdmin);
adminRout.route("/admin/register").post(controller.registerAdmin);
adminRout.route("/admin/login").post(controller.adminLogin);
adminRout.route("/admin/update/:id").put(controller.updateAdmin);

// export admin rout
export default adminRout;
