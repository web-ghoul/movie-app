import { Link, useLocation, useNavigate, useParams } from "@remix-run/react";
import { AiOutlineHome } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { useApp } from "~/contexts/AppContext";
import avatar from "../../assets/images/logo.png";
import IconButton from "../IconButton/IconButton";
import Logo from "../Logo/Logo";

const Header = () => {
  const navigate = useNavigate();
  const { dispatch: dispatchApp } = useApp();
  const { pathname } = useLocation();
  const { id } = useParams();

  const movieRoute = pathname === `/movie/${id}`;

  return (
    <header
      className={`z-[100] top-0 contain h-[100px] flex justify-between items-center gap-10 w-screen ${
        pathname === "/" || movieRoute ? "absolute" : "relative"
      }`}
    >
      {movieRoute ? (
        <>
          <Link
            to={"/"}
            className="text-4xl p-2 text-white transition-all hover:scale-125 !font-[600] group"
          >
            <GoArrowLeft />
          </Link>
        </>
      ) : (
        <>
          <Logo />

          <div className="flex justify-center items-center gap-4">
            <IconButton
              onClick={() => navigate("/")}
              className={`text-white text-xl py-1 hover:text-primary`}
            >
              <AiOutlineHome />
              <span className="subtitle_1">Home</span>
            </IconButton>
            <IconButton
              onClick={() => navigate("/search")}
              className={`text-white text-2xl hover:text-primary`}
            >
              <IoSearch />
            </IconButton>
            <div
              onClick={() => dispatchApp({ type: "sidebar", payload: true })}
              className="w-[40px] h-[40px] bg-no-repeat bg-center bg-cover border-[1px] border-transparent border-solid transition-all hover:cursor-pointer hover:border-primary rounded-full"
              style={{ backgroundImage: `url('${avatar}')` }}
            ></div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
