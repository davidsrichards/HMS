import { Schema, model } from "mongoose";

const PatientSchema = new Schema({
  firstname: {
    type: Schema.Types.String,
    required: true,
  },
  lastname: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Schema.Types.String,
    required: true,
  },
  dob: {
    type: Schema.Types.String,
    required: true,
  },
  date: {
    type: Schema.Types.Date,
    default: new Date(),
  },
});

const Patient = model("Patient", PatientSchema);
export default Patient;
