import "./Nav.css";
import image from "../../../assets/Image/doctor1.jpeg";
import { TiThMenu } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { handleShowBarAction } from "../../redox/features/AdminSlice";

function Navbar({ username }) {
  const dispatch = useDispatch();
  const { showbar } = useSelector((state) => state.admin);
  return (
    <div
      className={`bg-primary text-white p-4 flex  items-center fixed top-0 w-full nav ${
        !showbar && "z-10"
      }`}
    >
      <div className="lg:w-10/12 w-full flex justify-between  items-center h-[40px] px-4">
        <div className="font-bold md:block hidden">Admin</div>
        <button
          className="font-bold md:hidden block text-[1.5rem]"
          onClick={() => dispatch(handleShowBarAction(!showbar))}
        >
          <TiThMenu />
        </button>
        <div className="flex items-center justify-center gap-4 md:relative  absolute right-0 ">
          <span>{username}</span>
          <img src={image} alt="" className="img" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
