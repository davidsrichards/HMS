import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
<MdDelete />;
import toast, { Toaster } from "react-hot-toast";
import {
  deleteU,
  editU,
  GetAll,
  searchOne,
} from "../../../../../ServerHelperFn/ServerHelperFn";
import PatientProfile from "../../PatientProfile";
import Loading from "../../../Loading";
import axios from "axios";

function ManagePatient() {
  const [{ userData, serverError, isLoadng }, setUserInfo] = GetAll(
    "/patient/get/all",
    true
  );
  const [allUsers, setAllUsers] = useState([]);
  //

  useEffect(() => {
    (async () => {
      try {
        console.log();
        const data = await axios.get("/api/patient/get/all");
        if (data) {
          console.log(data.data);
          setAllUsers(data?.data);
        }
      } catch (error) {
        return error;
      }
    })();
  }, []);
  //
  const [inputSearch, setInputSearch] = useState("");
  const [disable, setDisables] = useState({ disable: true, allow: false });
  const [found, setFound] = useState(false);
  const [users, setUsers] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    dob: "",
    id: "",
  });

  // search

  const search = () => {
    setDisables((p) => ({ ...p, allow: false, disable: true }));
    if (inputSearch) {
      const findUser = allUsers.find((user) => user.firstname === inputSearch);
      if (!findUser) {
        console.log("not foud");
        return toast.error("user not found");
      }
      setFound(true);
      const { firstname, lastname, email, mobile, dob, _id } = findUser;
      setUsers((p) => ({
        ...p,
        firstname,
        lastname,
        email,
        mobile,
        dob,
        id: _id,
      }));
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
      const findUser = allUsers.find((user) => user.firstname === inputSearch);
      if (!findUser) {
        return toast.error("user not found");
      }
      const { _id } = findUser;
      const { firstname, lastname, email, mobile, dob } = users;
      try {
        const data = await axios.put(`/api/patient/update/${_id}`, {
          firstname,
          lastname,
          email,
          mobile,
          dob,
        });
        if (data) {
          setFound(false);
          return toast.success("success");
        }
      } catch (error) {
        return toast.error("error");
      }
    }
  };

  // delete one

  const deleteOne = async () => {
    const findUser = allUsers.find((user) => user.firstname === inputSearch);
    if (!findUser) {
      return toast.error("user not found");
    }
    const { _id } = findUser;
    try {
      const data = await axios.delete(`/api/patient/delete/${_id}`);
      if (data) {
        const updated = allUsers?.filter((data) => data?._id !== _id);
        setAllUsers(updated);
        toast.success("deleted");
        setFound(false);
        setInputSearch("");
      }
    } catch (error) {
      toast.error("error");
      return error;
    }
  };

  if (serverError) return <div>Connection Failed</div>;
  if (isLoadng) return <Loading />;

  return (
    <div className=" w-full flex items-center flex-col justify-center dt-profile ">
      <Toaster position="center-top" reverseOrder></Toaster>
      <div className="flex items-center  w-full  justify-center flex-wrap pb-4 gap-4">
        {found && (
          <div>
            <button
              className="self-start p-2 px-4 rounded-md bg-primary text-[#fff]"
              onClick={() => {
                setDisables((p) => ({ ...p, disable: false }));
                edit();
              }}
            >
              <MdEdit />
            </button>
            <button
              className="self-start p-2 px-4 rounded-md bg-red-500 text-[#fff] relative left-4 hover:bg-red-700"
              onClick={async () => await deleteOne()}
            >
              <MdDelete />
            </button>
          </div>
        )}
        <div className="self-center grow flex items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          {/*        <CiSearch className="absolute top-1 right-4 text-[1.3rem]" /> */}
          <button
            className="bg-primary text-[#fff] p-1 px-3 rounded-md  hover:bg-blue-600"
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
          <PatientProfile
            users={users}
            disable={disable.disable}
            setUsers={setUsers}
          />
        )}
        {!found &&
          allUsers?.map((user, i) => (
            <div key={i}>
              <PatientProfile users={user} disable={disable.disable} />
            </div>
          ))}
      </div>

      {found && disable.allow && (
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

export default ManagePatient;
