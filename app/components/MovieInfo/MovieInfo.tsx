import { ReactNode } from "react";

const MovieInfo = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant?: "basic";
}) => {
  return (
    <div
      className={`px-3 py-1 subtitle_1 flex justify-center items-center gap-2 text-white rounded-full !font-[600] ${
        variant === "basic" ? "" : "border-[1px] border-gray-100 glassy"
      }`}
    >
      {children}
    </div>
  );
};

export default MovieInfo;
