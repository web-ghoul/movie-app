import { CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "~/components/Button/Button";
import MovieInfo from "~/components/MovieInfo/MovieInfo";
import Overlay from "~/components/Overlay/Overlay";
import { RootState } from "~/store/store";

import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const HeroSection = () => {
  const { results } = useSelector((state: RootState) => state.trendyMovies);
  const { genres } = useSelector((state: RootState) => state.genres);

  return results.length > 0 && (
    <section className="w-screen min-h-screen h-screen">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={0}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
      >
        {
          results.map((movie, i) => <SwiperSlide key={i}>
            <div
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
              }}
              className="min-h-screen h-full bg-no-repeat bg-center bg-cover grid justify-start items-end contain contain_y relative"
            >
              <Overlay />
              <div className="grid justify-stretch items-center gap-6 w-1/2 2xl:w-[60vw] text-white z-[10] relative bottom-[20%] 2xl:bottom-[10%]">
                <div className="grid justify-stretch items-center gap-3">
                  <h1 className="!font-[700] text-white">
                    {movie.original_title}
                  </h1>
                  <div className="flex justify-start items-center gap-2 flex-wrap">
                    <MovieInfo>
                      <FaStar className="text-yellow-500" />
                      {movie.vote_average.toFixed(1)}/10
                    </MovieInfo>
                    <MovieInfo>
                      <CiCalendar />
                      {movie.release_date.split("-")[0]}
                    </MovieInfo>
                    {movie.genre_ids.map((genre, i) => (
                      <MovieInfo key={i}>
                        {genres?.find((g) => g.id === genre)?.name}
                      </MovieInfo>
                    ))}
                  </div>
                </div>
                <h6 className="line-clamp-3">{movie.overview}</h6>
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
            </div>
          </SwiperSlide>)
        }
      </Swiper>
    </section>
  );
};

export default HeroSection;
