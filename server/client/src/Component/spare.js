import { useEffect, useState } from "react";
import DoctorProfile from "../../../Global/DoctorProfile/DoctorProfile";
import "./ManageDoctor.css";
import {
  deleteU,
  editU,
  GetAll,
  searchOne,
} from "../../../../ServerHelperFn/ServerHelperFn";
import { MdEdit, MdKeyboardReturn } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
<MdDelete />;
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Loading";
import axios from "axios";

function ManageDoctor() {
  const [{ userData, serverError, isLoadng }, setUserInfo] = GetAll(
    "/doctor/get/all",
    true
  );
  const [inputSearch, setInputSearch] = useState("");
  const [disable, setDisables] = useState({ disable: true, allow: false });
  const [found, setFound] = useState(false);
  const [users, setUsers] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    id: "",
  });

  // userinfo

  const [allUsers, setAllUsers] = useState([]);

  // fetch

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("/api/doctor/get/all");
        if (data) {
          setAllUsers(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // search

  const search = async () => {
    setDisables((p) => ({ ...p, allow: false, disable: true }));
    if (inputSearch) {
      try {
        const data = await searchOne("/doctor/get", inputSearch);
        if (data) {
          setFound(true);
          const { firstname, lastname, position, email, _id } = data;
          setUsers((p) => ({
            ...p,
            firstname,
            lastname,
            email,
            position,
            id: _id,
          }));
        }
      } catch (error) {
        toast.error("user not found");
        setFound(false);
        return error;
      }
    }
  };

  // edit

  const edit = async () => {
    if (found) {
      setDisables((p) => ({ ...p, allow: true }));
    }
  };

  // save user

  const save = async () => {
    if (found && disable.allow) {
      try {
        const { firstname, lastname, email, position, id } = users;
        const data = await editU("/doctor/update/", id, {
          firstname,
          lastname,
          email,
          position,
        });
        if (data) {
          toast.success("successful");
          setFound(false);
        }
      } catch (error) {
        toast.error("user not found");
        return error;
      }
    }
  };

  // delete one

  const deleteOne = async () => {
    const { id } = users;
    try {
      const data = await deleteU("/doctor/delete/", id);
      if (data) {
        setFound(false);
        const updated = userData?.filter((data) => data?._id !== id);
        setUserInfo(() => ({ userData: updated }));
        toast.success("deleted");
        setFound(false);
        setInputSearch("");
      }
    } catch (error) {
      toast.error("error");
      return error;
    }
  };

  // loading

  if (serverError) return <div>Connection Failed</div>;
  if (isLoadng) return <Loading />;

  return (
    <div className=" w-full flex items-center flex-col justify-center dt-profile ">
      <Toaster position="center-top" reverseOrder></Toaster>
      <div className="flex items-center  w-full  justify-center flex-wrap pb-4 gap-4">
        {found && (
          <div>
            <button
              className="p-2 px-4 rounded-md bg-primary text-[#fff]"
              onClick={() => {
                setDisables((p) => ({ ...p, disable: false }));
                edit();
              }}
            >
              <MdEdit />
            </button>
            <button
              className="p-2 px-4 rounded-md bg-red-500 text-[#fff] relative left-4 hover:bg-red-700"
              onClick={async () => await deleteOne()}
            >
              <MdDelete />
            </button>
          </div>
        )}
        <div className="grow flex items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />

          <button
            className="bg-primary text-[#fff]  rounded-md p-1 px-3 hover:bg-blue-600"
            onClick={() => search()}
          >
            Search
          </button>
        </div>
        <div className="md:block hidden">
          <h2 className="self-end">
            Profile /
            <span className="italic text-slate-500 tracking-tighter">
              Data Profile
            </span>
          </h2>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        {found && (
          <DoctorProfile
            users={users}
            disable={disable.disable}
            setUsers={setUsers}
          />
        )}
        {!found &&
          allUsers?.map((user, i) => (
            <div key={i}>
              <DoctorProfile users={user} disable={disable.disable} />
            </div>
          ))}
      </div>

      {found && (
        <button
          onClick={async () => await save()}
          className="self-end bg-blue-700 text-[#fff] w-1/6 rounded-md h-8 hover:bg-blue-600 mt-4"
        >
          Save
        </button>
      )}
    </div>
  );
}

export default ManageDoctor;
