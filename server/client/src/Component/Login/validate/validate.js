// validate admin login

import toast from "react-hot-toast";

const verifyAdminLogin = (error, values) => {
  if (!values.username) {
    error.username = toast.error("username required");
  } else if (!values.password) {
    error.password = toast.error("password required");
  }
  return error;
};

export const validateAdminLogin = (values) => {
  const error = verifyAdminLogin({}, values);
  return error;
};

export const convertToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const readFile = new FileReader();
    readFile.readAsDataURL(file);
    readFile.onload = () => {
      resolve(readFile.result);
    };
    readFile.onerror = (err) => {
      reject(err);
    };
  });
};
