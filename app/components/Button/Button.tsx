import { ReactNode } from "react";

const Button = ({
  children,
  variant,
  onClick,
}: {
  children: ReactNode;
  variant: "primary" | "glassy" | "logout" | "icon";
  onClick?: () => void;
}) => {
  return (
    <button
      type={"button"}
      onClick={onClick}
      className={`outline-none border-[1px] transition-all border-solid border-white rounded-xl px-5 py-2 flex justify-center items-center gap-3 font-[600] button hover:scale-110 hover:font-[700] ${
        variant === "primary"
          ? "bg-white text-black "
          : variant === "glassy"
          ? "glassy bg-white"
          : variant === "logout"
          ? "bg-primary text-white !border-primary hover:shadow-md hover:shadow-primary !scale-100"
          : variant === "icon" &&
            "glassy bg-white !p-0 h-[45px] w-[45px] !rounded-full"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
