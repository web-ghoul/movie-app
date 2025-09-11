import { Link } from "@remix-run/react";
import logo from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <Link
      to={"/"}
      className={`flex justify-start items-center gap-3 text-white sm:!gap-2`}
    >
      <img
        src={logo}
        alt="logo"
        className={`w-[50px] md:w-[45px] sm:!w-[40px]`}
      />
      <div className="grid justify-stretch items-center gap-0">
        <h5 className="!font-[700]">webGhoul</h5>
        <span className="body_2 text-primary leading-[2px] font-[600]">
          Movies & Series
        </span>
      </div>
    </Link>
  );
};

export default Logo;
