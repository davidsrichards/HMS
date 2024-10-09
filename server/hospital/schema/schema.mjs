import mongoose from "mongoose";

const adminModel = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
  },
  password: {
    type: mongoose.Schema.Types.String,
  },
});

// export schema
const Admin = mongoose.model("Admin", adminModel);
export default Admin;

/* export default Admin = new mongoose.model("Admin", adminModel); */
