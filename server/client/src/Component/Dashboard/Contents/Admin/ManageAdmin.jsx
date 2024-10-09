import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
<MdDelete />;
import toast, { Toaster } from "react-hot-toast";
import {
  editU,
  GetAdmin,
  GetAll,
} from "../../../ServerHelperFn/ServerHelperFn";
import AdminProfile from "./AdminProfile";
import { useFormik } from "formik";
import axios from "axios";

function ManageAdmin() {
  const [disable, setDisables] = useState({ disable: true, allow: false });
  const [admin, setAdmin] = useState({ username: "", password: "", id: "" });

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/admin/get");
        if (data) {
          data?.map((data) => {
            console.log(data.username);
            setAdmin((p) => ({
              ...p,
              username: data.username,
              password: data.password,
              id: data._id,
            }));
          });
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    })();
  }, []);

  // edit

  const edit = async () => {
    setDisables((p) => ({ ...p, allow: true, disable: false }));
  };

  // save user

  const save = async () => {
    if (disable.allow) {
      try {
        const { username, password } = admin;
        const data = await editU("/admin/update/", admin?.id, {
          username,
          password,
        });
        if (data) {
          toast.success("successful");

          window.location.reload();
        }
      } catch (error) {
        toast.error("user not found");
        return error;
      }
    }
  };

  return (
    <div className=" w-full flex items-center flex-col justify-center dt-profile ">
      <Toaster position="center-top" reverseOrder></Toaster>
      <div className="flex items-center justify-between w-full relative -top-4">
        <div>
          <button
            className="self-start p-2 px-4 rounded-md bg-primary text-[#fff]"
            onClick={() => edit()}
          >
            <MdEdit />
          </button>
        </div>

        <div>
          <h2 className="self-end">
            Profile /
            <span className="italic text-slate-500 tracking-tighter">
              Data Profile
            </span>
          </h2>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <AdminProfile
          disable={disable.disable}
          users={admin}
          setUsers={setAdmin}
        />
      </div>

      {disable.allow && (
        <button
          onClick={() => save()}
          className="self-end bg-blue-700 text-[#fff] w-1/6 rounded-md h-8 hover:bg-blue-600 mt-4"
        >
          Save
        </button>
      )}
    </div>
  );
}

export default ManageAdmin;
