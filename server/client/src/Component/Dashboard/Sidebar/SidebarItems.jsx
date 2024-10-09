import { IoAddCircle } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function SidebarItems({ text, to, icon }) {
  return (
    <NavLink
      to={to}
      className="flex items-center hover:bg-blue-700 hover:text-[#fff] cursor-pointer p-4 group/item gap-5 rounded-md"
    >
      {icon}
      <li className="text-md">{text}</li>
    </NavLink>
  );
}

export default SidebarItems;
