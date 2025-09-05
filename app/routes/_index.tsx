import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import HeroSection from "~/sections/HeroSection/HeroSection";
import MoviesListSection from "~/sections/MoviesListSection/MoviesListSection";
import { getGenres } from "~/store/genresSlice";
import { AppDispatch } from "~/store/store";
import { getTopRatedMovies } from "~/store/topRatedMoviesSlice";
import { getTrendyMovies } from "~/store/trendyMoviesSlice";
import { GenreTypes, MovieTypes } from "~/types/app";

export async function loader() {
  const [trendyMoviesRes, genresRes, topMoviesRes] = await Promise.all([
    axios.get("https://api.themoviedb.org/3/trending/movie/day", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    }),
    axios.get("https://api.themoviedb.org/3/genre/movie/list", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    }),
    axios.get("https://api.themoviedb.org/3/movie/top_rated", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    }),
  ]);

  const trendyMovies: {
    page: number;
    results: MovieTypes[];
    total_pages: number;
    total_results: number;
  } = await trendyMoviesRes.data;

  const topMovies: {
    page: number;
    results: MovieTypes[];
    total_pages: number;
    total_results: number;
  } = await topMoviesRes.data;

  const genres: GenreTypes[] = await genresRes.data.genres;

  return json({
    trendyMovies,
    topMovies,
    genres,
  });
}

const _index = () => {
  const { trendyMovies, topMovies, genres } = useLoaderData<typeof loader>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTrendyMovies(trendyMovies));
    dispatch(getTopRatedMovies(topMovies));
    dispatch(getGenres(genres));
  }, [dispatch]);

  return (
    <>
      <HeroSection />
      <MoviesListSection title={"Trending Today"} />
    </>
  );
};

export default _index;
