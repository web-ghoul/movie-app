import { ReactNode } from "react";

const MovieInfo = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-[1px] border-gray-100 glassy px-3 py-1 subtitle_2 flex justify-center items-center gap-2 text-white rounded-full !font-[600]">
      {children}
    </div>
  );
};

export default MovieInfo;
