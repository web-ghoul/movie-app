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
import { useApp } from "~/contexts/AppContext";
import { RootState } from "~/store/store";

const MoviesListSection = ({ title, variant, cats }: { title: string; variant: "trendy" | "rated" | "upcomming" | "genres"; cats?: string[] }) => {
  const { state: stateApp } = useApp()
  const { results: trendyMovies } = useSelector((state: RootState) => state.trendyMovies);
  const { results: trendyTV } = useSelector((state: RootState) => state.trendyTV);
  const { results: topRatedMovies } = useSelector((state: RootState) => state.topRatedMovies);
  const { results: topRatedTV } = useSelector((state: RootState) => state.topRatedTV);
  const { results: upcomingMovies } = useSelector((state: RootState) => state.upcomingMovies);

  const movies = variant === "trendy" ? stateApp.tab === "movies" ? trendyMovies : trendyTV : variant === "rated" ? stateApp.tab === "movies" ? topRatedMovies : topRatedTV : variant === "upcomming" ? upcomingMovies : []

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
