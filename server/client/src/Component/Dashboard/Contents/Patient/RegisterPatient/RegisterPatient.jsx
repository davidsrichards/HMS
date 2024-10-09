import { useState } from "react";
import profile from "../../../../../assets/Image/doctor1.jpeg";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { register } from "../../../../ServerHelperFn/ServerHelperFn";
import { useLocation, useNavigate } from "react-router-dom";

function PatientReg() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [file, setFiles] = useState();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      dob: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { image: file || profile });
      try {
        let registerPromise = register("/patient/register", values);
        toast
          .promise(registerPromise, {
            loading: <div>validating...</div>,
            success: "successfull",
            error: "try again or use a different email",
          })
          .then(() => {
            const oldpath = location.pathname;
            const newpath = oldpath.replace(
              "patient-registration",
              "manage-patient"
            );
            return navigate(newpath, { replace: true, relative: true });
          });
      } catch (error) {
        return error;
      }
    },
  });

  return (
    <div className=" flex flex-col items-center  w-full dt-profile">
      <form
        className=" w-full flex flex-col gap-2 bg-[#fff] p-4 shadow flex-1 rounded-md"
        onSubmit={formik.handleSubmit}
      >
        <Toaster position="top-center"></Toaster>
        <div className="font-semibold">Create Patient</div>
        <label htmlFor="profile">
          <img
            src={
              file ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4KGHb0zM_ceTNV3g8PCaW5UEyuYQU954ZCA&s"
            }
            alt="profile"
            className="img mx-auto cursor-pointer"
          />
        </label>
        <input
          disabled
          onChange={""}
          type="file"
          name="profile"
          id="profile"
          className="ring-0 hidden"
        />
        <div className="w-full grid sm:grid-cols-2 gap-2">
          <input
            {...formik.getFieldProps("firstname")}
            type="text"
            placeholder="firstname"
            className="input"
            required
          />
          <input
            {...formik.getFieldProps("lastname")}
            type="text"
            placeholder="lastname"
            className="input"
            required
          />
        </div>
        <div className="w-full grid sm:grid-cols-2 gap-2">
          <input
            {...formik.getFieldProps("email")}
            type="email"
            placeholder="email"
            className="input"
            required
          />
          <input
            {...formik.getFieldProps("mobile")}
            type="number"
            placeholder="mobile"
            className="input"
            required
          />
        </div>
        <div className="w-full grid sm:grid-cols-2 gap-2">
          <input
            {...formik.getFieldProps("dob")}
            type="date"
            placeholder="date of birth"
            className="input"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-[#fff] sm:w-1/6 w-full rounded-md h-8 hover:bg-blue-600 mt-4 self-end"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default PatientReg;
