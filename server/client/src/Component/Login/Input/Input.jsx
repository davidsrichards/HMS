import "./Input.css";
import image from "../../../assets/Image/hospital-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { validateAdminLogin } from "../validate/validate";
import { adminLogin } from "../../ServerHelperFn/ServerHelperFn";
import { useDispatch, useSelector } from "react-redux";
import { addAdminUsernameAction } from "../../redox/features/AdminSlice";

function Input() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isText, setIsText] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    validate: validateAdminLogin,
    initialValues: {
      username: "",
      password: "",
    },

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        let { data, status } = await adminLogin(values);
        if (status === 200) {
          setLoading(false);
          toast.success("successfull");
          dispatch(addAdminUsernameAction(values.username));
          return navigate("/dashboard");
        }
      } catch (error) {
        setLoading(false);
        if (error === 404) {
          toast.error("Invalid Credentials");
        } else {
          toast.error("Connection Lost");
        }
      }
    },
  });

  return (
    <div className="w-full h-screen flex items-center justify-center  bg-secondary sm:p-8 p-2">
      <div className="bg-[#fff] flex flex-col gap-8 p-12 w-full">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="self-center">
          <img src={image} alt="" className="w-[6rem] h-[6rem]" />
        </div>
        <h1 className="sign text-[1.8rem]">Sign In</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6 border-b-[0.8px] border-slate-400 pb-6"
        >
          <input
            type="text"
            className="text-field p-3 outline-none ring-[0.6px] ring-slate-500 rounded-md w-full"
            placeholder="Email address"
            {...formik.getFieldProps("username")}
          />
          <div className="relative w-full">
            {!isText && (
              <IoMdEye
                className="absolute right-4 top-[1rem] text-[1.3rem]"
                onClick={() => setIsText(true)}
              />
            )}
            {isText && (
              <IoMdEyeOff
                className="absolute right-4 top-[1rem] text-[1.3rem]"
                onClick={() => setIsText(false)}
              />
            )}
            <input
              type={isText ? "text" : "password"}
              className="text-field p-3 outline-none ring-[0.6px] ring-slate-500 rounded-md w-full"
              placeholder="password"
              {...formik.getFieldProps("password")}
            />
          </div>
          <button
            type="submit"
            className="bg-primary uppercase p-[0.5rem] text-[#fff] rounded-md transition-all duration-300 ease-in-out hover:bg-[#28608d]"
          >
            {loading ? (
              <div className="border-r-2 border-t-2 w-[2rem] h-[2rem] rounded-full animate-spin mx-auto"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <Link className="uppercase btn underline select-none">
          forget your password?
        </Link>
      </div>
    </div>
  );
}

export default Input;
