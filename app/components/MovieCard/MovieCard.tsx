import { Link } from "@remix-run/react";
import { FaStar } from "react-icons/fa";
import { MovieTypes } from "~/types/app";
import Overlay from "../Overlay/Overlay";

const MovieCard = ({ movie }: { movie: MovieTypes }) => {
  return (
    <Link to={"/"}>
      <article
        className={`w-full h-[300px] relative transition-all group overflow-hidden flex justify-center items-end group`}
      >
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.poster_path}')`,
          }}
          className={`bg-no-repeat bg-cover bg-center absolute h-full w-full transition-all duration-500 group-hover:scale-110`}
        ></div>
        <Overlay className={`opacity-0 group-hover:opacity-100 z-[5]`} />
        <div className="grid justify-stretch items-center gap-4 text-white translate-y-[100%] transition-all duration-500 group-hover:translate-y-0 z-[10] px-2 py-4 w-full">
          <h6 className="font-[600] line-clamp-2">{movie.title}</h6>
          <div className="flex justify-between items-center gap-4 text-neutral-400">
            <span className="subtitle_1">Movie</span>
            <div className="flex justify-center items-center gap-2">
              <FaStar className={`text-primary text-xl`} />
              <span className="subtitle_1">
                {movie.vote_average.toFixed(1)}/10
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;
