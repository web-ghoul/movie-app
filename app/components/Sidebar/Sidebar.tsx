import { MdOutlineClose, MdOutlineLogout } from "react-icons/md";
import { useApp } from "~/contexts/AppContext";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";

const Sidebar = () => {
  const { state, dispatch: dispatchApp } = useApp();

  return (
    <div
      className={`fixed w-full h-full transition-all duration-500 top-0 ${state.sidebar ? "z-[1000] glassy_black" : "bg-transparent z-[-1]"
        }`}
    >
      <div
        className={`fixed top-0 right-0 h-full glassy_dark text-white grid justify-stretch items-start border-[1px] border-solid !border-neutral-800 min-w-[20vw] transition-all ${state.sidebar ? "translate-x-[0%]" : "translate-x-[100%]"
          }`}
      >
        <div className="flex justify-between items-center gap-10 p-6 border-b-[1px] border-b-neutral-800 border-b-solid">
          <h4>My Account</h4>

          <IconButton
            onClick={() => dispatchApp({ type: "sidebar", payload: false })}
          >
            <MdOutlineClose />
          </IconButton>
        </div>

        <div className="grid justify-stretch items-center gap-10 content-between self-stretch p-6">
          <div className="grid"></div>
          <div className="grid justify-stretch items-center gap-4">
            <hr className="border-neutral-800" />
            <Button variant="logout">
              <MdOutlineLogout />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
