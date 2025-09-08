import { useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { RxDownload } from "react-icons/rx";
import { useSelector } from "react-redux";
import Button from "~/components/Button/Button";
import MovieInfo from "~/components/MovieInfo/MovieInfo";
import Overlay from "~/components/Overlay/Overlay";
import { RootState } from "~/store/store";

const MovieSection = () => {
  const [show, setShow] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { movie, videos } = useSelector((state: RootState) => state.movie);
  const { genres } = useSelector((state: RootState) => state.genres);

  const video = videos.find((video) => video.type === "Trailer") || videos[0];

  const minutesToHours = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}m`;
  };

  const startHideTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShow(true);
  };

  const handleMouseLeave = () => {
    startHideTimer();
  };

  useEffect(() => {
    startHideTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    movie &&
    genres.length > 0 && (
      <section
        style={
          !videos || videos.length === 0
            ? {
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
              }
            : {}
        }
        className="min-h-screen h-full bg-no-repeat bg-center bg-cover grid justify-start items-end contain contain_y relative w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {videos && videos.length > 0 && (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.key}`}
            title={video.name}
            frameBorder="0"
            allow="autoplay; fullscreen"
          />
        )}
        <Overlay />
        <div className="grid justify-stretch items-center gap-6 w-[35vw] 2xl:w-[50vw] lg:w-full text-white z-[10] relative bottom-[20%] 2xl:bottom-[10%]">
          <div className="grid justify-stretch items-center gap-4">
            <h1 className="!font-[700] line-clamp-2">{movie.original_title}</h1>
            <div
              className={`grid justify-stretch items-center gap-3 transition-all duration-500  ${
                show ? "flex" : "hidden"
              }`}
            >
              <div className="flex justify-start items-center gap-2 flex-wrap">
                <MovieInfo variant={"basic"}>
                  <CiCalendar />
                  {movie.release_date.split("-")[0]}
                </MovieInfo>
                <MovieInfo variant={"basic"}>
                  <GoClockFill />
                  {minutesToHours(movie.runtime)}
                </MovieInfo>
                <MovieInfo variant={"basic"}>
                  <FaStar className="text-yellow-500" />
                  {movie.vote_average.toFixed(1)}/10
                </MovieInfo>
              </div>
              <div className="flex justify-start items-center gap-3 flex-wrap">
                {movie.genres.map((genre, i) => (
                  <MovieInfo key={i}>
                    {genres?.find((g) => g.id === genre.id)?.name}
                  </MovieInfo>
                ))}
              </div>
            </div>
          </div>
          <h6
            className={`line-clamp-3 transition-all duration-500 ${
              show ? "flex" : "hidden"
            }`}
          >
            {movie.overview}
          </h6>
          <div className="flex flex-wrap justify-stretch item-center gap-6">
            <Button variant="primary">
              <IoPlay />
              Play
            </Button>
            <Button variant="icon">
              <IoMdAdd />
            </Button>
            <Button variant="icon">
              <RxDownload />
            </Button>
            <a href="#similar">
              <Button variant="glassy">Similars</Button>
            </a>
          </div>
        </div>
      </section>
    )
  );
};

export default MovieSection;
