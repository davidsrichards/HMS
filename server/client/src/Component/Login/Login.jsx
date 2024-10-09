import { useEffect } from "react";
import Image from "./Image/Image";
import Input from "./Input/Input";
import { useDispatch } from "react-redux";
import { addAdminUsernameAction } from "../redox/features/AdminSlice";

function Login() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addAdminUsernameAction(""));
  }, []);
  return (
    <div className="grid lg:grid-cols-2 min-w-full h-screen">
      <Image />
      <Input />
    </div>
  );
}

export default Login;
