import "./Sidebar.css";
import image from "../../../assets/Image/hospital-logo.png";
import { FaBed } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import SidebarItems from "./SidebarItems";
import { MdManageAccounts } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdminUsernameAction,
  handleShowBarAction,
} from "../../redox/features/AdminSlice";
import { IoHomeSharp } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
<ImCancelCircle />;

const Sidebar = () => {
  const dispatch = useDispatch();
  const [openP, setOpenP] = useState(false);
  const [openD, setOpenD] = useState(false);

  const { showbar } = useSelector((state) => state.admin);

  return (
    <div
      className={`h-screen bg-[#fff] md:w-64 fixed  w-0 transition-all duration-300 ease-in-out overflow-auto ${
        showbar && "w-48 z-10"
      }`}
    >
      <div className="p-4  flex items-center justify-center">
        <img
          src={image}
          alt=""
          className={` rounded-full h-[5rem] md:block hidden w-[5rem] self-center `}
        />
        <ImCancelCircle
          className="text-[1.5rem] cursor-pointer md:hidden block"
          onClick={() => dispatch(handleShowBarAction(!showbar))}
        />
      </div>
      <ul className="p-3">
        <div>
          <NavLink
            to={"/dashboard"}
            className="flex items-center  hover:bg-blue-700 hover:text-[#fff] cursor-pointer p-4 group/item text-lg gap-5 rounded-md"
          >
            <IoHomeSharp className="icon" />
            <li className=" text-lg">Home</li>
          </NavLink>
          <div className=" hover:bg-blue-700 hover:text-[#fff] cursor-pointer p-4 group/item rounded-md flex items-center justify-between">
            <div className="flex items-center gap-5">
              <FaBed className="icon" />
              <li className="text-lg">Patients</li>
            </div>
            <MdKeyboardArrowDown
              className={`text-[1.4rem] ${openP ? "rotate-180" : "rotate-0"}`}
              onClick={() => setOpenP((p) => !p)}
            />
          </div>
          {openP && (
            <div>
              <SidebarItems
                icon={<IoAddCircle className="icon" />}
                text={"Create"}
                to={"/dashboard/patient-registration"}
              />
              <SidebarItems
                text={"Manage"}
                to={"/dashboard/manage-patient"}
                icon={<MdManageAccounts className="icon" />}
              />
            </div>
          )}
        </div>
        <div>
          <div className="hover:bg-blue-700 hover:text-[#fff] cursor-pointer p-4 group/item rounded-md flex items-center justify-between">
            <div className="flex items-center gap-5">
              <FaUserDoctor className="icon" />
              <li className="text-lg">Doctors</li>
            </div>
            <MdKeyboardArrowDown
              className={`text-[1.4rem] ${openD ? "rotate-180" : "rotate-0"}`}
              onClick={() => setOpenD((p) => !p)}
            />
          </div>
          {openD && (
            <div>
              <SidebarItems
                icon={<IoAddCircle className="icon" />}
                text={"Create"}
                to={"/dashboard/doctor-registration"}
              />
              <SidebarItems
                text={"manage"}
                to={"/dashboard/manage-doctor"}
                icon={<MdManageAccounts className="icon" />}
              />
            </div>
          )}
        </div>
        <NavLink
          to={"/dashboard/manage-admin"}
          className="flex items-center hover:bg-blue-700 hover:text-[#fff] cursor-pointer p-4 group/item gap-5 rounded-md"
        >
          <IoIosSettings className="icon" />
          <li className="text-lg">Profile</li>
        </NavLink>
        <NavLink
          onClick={() => dispatch(addAdminUsernameAction(""))}
          to={"/"}
          className="flex items-center  hover:bg-blue-700 hover:text-[#fff] cursor-pointer p-4 group/item text-lg gap-5 rounded-md"
        >
          <RiLogoutCircleFill className="icon" />
          <li className=" text-lg">Logout</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
