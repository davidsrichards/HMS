import { Schema, model } from "mongoose";

const doctorsModel = new Schema({
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
  position: {
    type: Schema.Types.String,
  },
  image: {
    type: Schema.Types.String,
  },
  date: {
    type: Schema.Types.Date,
    default: new Date(),
  },
});

const Doctors = model("Doctors", doctorsModel);
export default Doctors;
