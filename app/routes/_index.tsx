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
import { getTrendyTV } from "~/store/trendyTVSlice";
import { getUpcomingMovies } from "~/store/upcomingMoviesSlice";
import { GenreTypes, MovieTypes } from "~/types/app";

export async function loader() {
  const [trendyMoviesRes, trendyTVRes, upcomingMoviesRes, genresRes, topMoviesRes] = await Promise.all([
    axios.get("https://api.themoviedb.org/3/trending/movie/day", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    }),
    axios.get("https://api.themoviedb.org/3/trending/tv/day", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    }),
    axios.get("https://api.themoviedb.org/3/movie/upcoming", {
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

  const trendyTV: {
    page: number;
    results: MovieTypes[];
    total_pages: number;
    total_results: number;
  } = await trendyTVRes.data;

  const topMovies: {
    page: number;
    results: MovieTypes[];
    total_pages: number;
    total_results: number;
  } = await topMoviesRes.data;


  const upcomingMovies: {
    page: number;
    results: MovieTypes[];
    total_pages: number;
    total_results: number;
  } = await upcomingMoviesRes.data;

  const genres: GenreTypes[] = await genresRes.data.genres;

  return json({
    trendyMovies,
    trendyTV,
    topMovies,
    upcomingMovies,
    genres,
  });
}

const _index = () => {
  const { trendyMovies, trendyTV, topMovies, upcomingMovies, genres } = useLoaderData<typeof loader>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTrendyMovies(trendyMovies));
    dispatch(getTrendyTV(trendyTV));
    dispatch(getTopRatedMovies(topMovies));
    dispatch(getUpcomingMovies(upcomingMovies));
    dispatch(getGenres(genres));
  }, [dispatch]);

  return (
    <>
      <HeroSection />
      <MoviesListSection title={"Trending Today"} variant={"trendy"} cats={["Movies", "Series"]} />
      <MoviesListSection title={"Upcomming"} variant={"upcomming"} />
      <MoviesListSection title={"Top rated"} variant={"rated"} cats={["Movies", "Series"]} />
      <MoviesListSection title={"Genres"} variant={"genres"} cats={["Comedy", "Action", "Drama", "Horror", "Romance", "Animation"]} />
    </>
  );
};

export default _index;
