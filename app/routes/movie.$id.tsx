import { LoaderFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ActorsSection from "~/sections/ActorsSection/ActorsSection";
import MovieSection from "~/sections/MovieSection/MovieSection";
import MoviesSection from "~/sections/MoviesSection/MoviesSection";
import { getCast } from "~/store/castSlice";
import { getGenres } from "~/store/genresSlice";
import { getMovie } from "~/store/movieSlice";
import { getSimilarMovies } from "~/store/similarMoviesSlice";
import { AppDispatch } from "~/store/store";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) throw new Response("Movie ID is required", { status: 400 });

  const [res, videosRes, genresRes, castRes, similarMoviesRes] = await Promise.all([
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, { headers: { Authorization: `Bearer ${process.env.TOKEN}` } }),
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, { headers: { Authorization: `Bearer ${process.env.TOKEN}` } }),
    axios.get("https://api.themoviedb.org/3/genre/movie/list", { headers: { Authorization: `Bearer ${process.env.TOKEN}` } }),
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, { headers: { Authorization: `Bearer ${process.env.TOKEN}` } }),
    axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, { headers: { Authorization: `Bearer ${process.env.TOKEN}` } }),
  ]);

  return {
    movie: res.data,
    videos: videosRes.data.results,
    genres: genresRes.data.genres,
    similarMovies: similarMoviesRes.data,
    cast: castRes.data.cast,
  };
}

export default function MoviePage() {
  const { movie, videos, genres, similarMovies, cast } =
    useLoaderData<typeof loader>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMovie({ movie, videos }));
    dispatch(getGenres(genres));
    dispatch(getCast(cast));
    dispatch(getSimilarMovies(similarMovies));
  }, [dispatch, movie, videos, genres, similarMovies, cast]);

  return (
    <>
      <MovieSection />
      <ActorsSection />
      <MoviesSection
        title={"You may like"}
        movies={similarMovies.results}
        id={"similar"}
      />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <section className="text-white text-center">
        <h2>
          {error.status} – {error.data}
        </h2>
      </section>
    );
  }

  return <h2 className="text-red-500">Something went wrong.</h2>;
}
