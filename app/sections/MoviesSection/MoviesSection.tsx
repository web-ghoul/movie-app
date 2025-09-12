import LoadingMovieCard from "~/components/MovieCard/LoadingMovieCard";
import MovieCard from "~/components/MovieCard/MovieCard";
import NoResultsFound from "~/components/NoResultsFound/NoResultsFound";
import Title from "~/components/Title/Title";
import { MovieTypes } from "~/types/app";

const MoviesSection = ({
  title,
  movies,
  id,
  loading,
}: {
  title: string;
  movies: MovieTypes[];
  id?: string;
  loading?: boolean;
}) => {
  return (
    <section
      id={id}
      className="grid justify-stretch items-center gap-6 contain contain_y md:gap-5 sm:!gap-4"
    >
      <div className="grid justify-stretch items-center gap-1 sm:!gap-0">
        <Title text={title} />
        <h6 className="text-neutral-500">{movies.length} results found</h6>
      </div>
      {movies.length > 0 ? (
        <div className="grid grid-cols-6 justify-stretch items-center gap-4 3xl:grid-cols-5 md:!grid-cols-3 xs:!grid-cols-2">
          {movies.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </div>
      ) : loading ? (
        <div className="grid grid-cols-6 justify-stretch items-center gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <LoadingMovieCard />
          ))}
        </div>
      ) : (
        <NoResultsFound />
      )}
    </section>
  );
};

export default MoviesSection;
