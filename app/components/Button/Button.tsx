import { ReactNode } from "react";

const Button = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "primary" | "glassy" | "logout";
}) => {
  return (
    <button
      type={"button"}
      className={`outline-none border-[1px] transition-all border-solid border-white rounded-xl px-5 py-2 flex justify-center items-center gap-3 font-[600] button hover:scale-110 ${variant === "primary"
        ? "bg-white text-black "
        : variant === "glassy"
          ? "glassy bg-white"
          : variant === "logout" &&
          "bg-primary text-white !border-primary hover:shadow-md hover:shadow-primary !scale-100"
        }`}
    >
      {children}
    </button>
  );
};

export default Button;
