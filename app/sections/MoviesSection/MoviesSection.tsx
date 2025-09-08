import MovieCard from "~/components/MovieCard/MovieCard";
import Title from "~/components/Title/Title";
import { MovieTypes } from "~/types/app";

const MoviesSection = ({
  title,
  movies,
  id,
}: {
  title: string;
  movies: MovieTypes[];
  id?: string;
}) => {
  return (
    <section
      id={id}
      className="grid justify-stretch items-center gap-8 contain contain_y"
    >
      <div className="grid justify-stretch items-center gap-1">
        <Title text={title} />
        <span className="subtitle_1 text-neutral-600">
          {movies.length} results found
        </span>
      </div>
      <div className="grid grid-cols-6 justify-stretch items-center gap-4">
        {movies.map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MoviesSection;
