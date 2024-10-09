import image from "../../../assets/Image/fpn-img.svg";
import logo from "../../../assets/Image/hospital-logo.png";

import "./Image.css";
function Image() {
  return (
    <div className="h-screen main bg-primary lg:flex hidden p-4 justify-center">
      <div className="flex flex-col items-center justify-center  gap-4">
        <div className="flex items-center">
          <img src={logo} alt="" className="w-[80px] h-[80px] logo" />
          <div className="name  text-wrap ml-4 uppercase">
            hospital management system
          </div>
        </div>
        <img src={image} alt="Avatar" className="w-[55%] h-[55%] flex-grow-1" />
      </div>
    </div>
  );
}

export default Image;
