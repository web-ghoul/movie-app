import { CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { useSelector } from "react-redux";
import Button from "~/components/Button/Button";
import MovieInfo from "~/components/MovieInfo/MovieInfo";
import Overlay from "~/components/Overlay/Overlay";
import { RootState } from "~/store/store";

const HeroSection = () => {
  const { results } = useSelector((state: RootState) => state.trendyMovies);
  const { genres } = useSelector((state: RootState) => state.genres);

  return results.length > 0 && (
    <section
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${results?.[10].backdrop_path}')`,
      }}
      className="min-h-screen h-full bg-no-repeat bg-center bg-cover grid justify-start items-end contain contain_y relative"
    >
      <Overlay />
      <div className="grid justify-stretch items-center gap-6 w-1/2 text-white z-[10] relative bottom-[20%]">
        <div className="grid justify-stretch items-center gap-3">
          <h1 className="!font-[700] text-white">
            {results?.[10].original_title}
          </h1>
          <div className="flex justify-start items-center gap-2 flex-wrap">
            <MovieInfo>
              <FaStar className="text-yellow-500" />
              {results?.[10].vote_average.toFixed(1)}/10
            </MovieInfo>
            <MovieInfo>
              <CiCalendar />
              {results?.[10].release_date.split("-")[0]}
            </MovieInfo>
            {results?.[10].genre_ids.map((genre, i) => (
              <MovieInfo key={i}>
                {genres?.find((g) => g.id === genre)?.name}
              </MovieInfo>
            ))}
          </div>
        </div>
        <h6>{results?.[10].overview}</h6>
        <div className="flex flex-wrap justify-stretch item-center gap-6">
          <Button variant="primary">
            <IoPlay />
            Play
          </Button>
          <Button variant="glassy">
            <IoMdInformationCircleOutline />
            See More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
