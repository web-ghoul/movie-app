import { ReactNode } from "react";

const IconButton = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      type={"button"}
      className={`text-xl p-2 rounded-md flex justify-center bg-transparent items-center gap-3 border-none outline-none transition-all hover:glassy font-[600] ${className}`}
    >
      {children}
      <span className="hidden">.</span>
    </button>
  );
};

export default IconButton;
