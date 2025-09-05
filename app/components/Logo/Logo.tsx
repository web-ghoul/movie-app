import { Link } from "@remix-run/react";
import logo from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <Link to={"/"} className={`flex justify-start items-center gap-3 text-white`}>
      <img src={logo} alt="logo" className={`w-[50px]`} />
      <h5 className="!font-[700]">webGhoul</h5>
    </Link>
  );
};

export default Logo;
