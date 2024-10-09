import { useState } from "react";
import profile from "../../../../../../assets/Image/doctor1.jpeg";
import { useFormik } from "formik";
import { convertToBase64 } from "../../../../../Login/validate/validate";
import { register } from "../../../../../ServerHelperFn/ServerHelperFn";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addDoctorsAction } from "../../../../../redox/features/DoctorsSlice";

function DoctorsReg() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFiles] = useState();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      position: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { image: file || profile });
      try {
        let registerPromise = register("/doctor/register", values);
        toast
          .promise(registerPromise, {
            loading: <div>validating...</div>,
            success: "successfull",
            error: "try again or use a different email",
          })
          .then(() => {
            const oldpath = location.pathname;
            const newPath = oldpath.replace(
              "doctor-registration",
              "manage-doctor"
            );
            return navigate(newPath, { replace: true, relative: true });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        return error;
      }
    },
  });

  const upload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFiles(base64);
  };
  return (
    <div className=" flex flex-col items-center  w-full dt-profile">
      <form
        className=" w-full flex flex-col gap-2 bg-[#fff] p-4 shadow flex-1 rounded-md"
        onSubmit={formik.handleSubmit}
      >
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="font-semibold">Create Doctor</div>
        <label htmlFor="profile">
          <img
            src={file || profile}
            alt="profile"
            className="img mx-auto cursor-pointer"
          />
        </label>
        <input
          onChange={upload}
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
            {...formik.getFieldProps("position")}
            type="text"
            placeholder="position"
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

export default DoctorsReg;
