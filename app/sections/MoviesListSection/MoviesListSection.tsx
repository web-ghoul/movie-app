import { useSelector } from "react-redux";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import CategoriesTabs from "~/components/CategoriesTabs/CategoriesTabs";
import MovieCard from "~/components/MovieCard/MovieCard";
import Title from "~/components/Title/Title";
import { RootState } from "~/store/store";

const MoviesListSection = ({ title, variant, cats }: { title: string; variant: "trendy" | "rated" | "genres"; cats?: string[] }) => {
  const { results: trendyMovies } = useSelector((state: RootState) => state.trendyMovies);
  const { results: topRatedMovies } = useSelector((state: RootState) => state.topRatedMovies);

  const movies = variant === "trendy" ? trendyMovies : variant === "rated" ? topRatedMovies : []

  return (
    <section className="grid justify-stretch items-center gap-6 contain contain_y">
      <div className="flex justify-between items-center gap-4">
        <Title text={title} />
        {cats && <CategoriesTabs cats={cats} />}
      </div>

      {movies.length > 0 &&
        <Swiper
          modules={[Scrollbar, Navigation]}
          spaceBetween={10}
          slidesPerView="auto"
          scrollbar={{ draggable: true }}
          className={`w-full`}
        >
          {
            movies.map((movie, i) => <SwiperSlide className="!w-[200px] !h-[300px]" key={i}>
              <MovieCard movie={movie} />
            </SwiperSlide>)
          }
        </Swiper>}
    </section>
  );
};

export default MoviesListSection;
