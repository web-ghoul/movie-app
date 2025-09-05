import { useSelector } from "react-redux";
import MovieCard from "~/components/MovieCard/MovieCard";
import Title from "~/components/Title/Title";
import { RootState } from "~/store/store";

const MoviesListSection = ({ title }: { title: string }) => {
  const { results } = useSelector((state: RootState) => state.trendyMovies);
  return (
    <section className="grid justify-stretch items-center gap-8 contain">
      <Title text={title} />
      {results.length > 0 && <MovieCard movie={results[0]} />}
    </section>
  );
};

export default MoviesListSection;
