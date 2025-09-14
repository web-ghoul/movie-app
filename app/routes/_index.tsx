import { defer } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import HeroSection from "~/sections/HeroSection/HeroSection";
import MoviesListSection from "~/sections/MoviesListSection/MoviesListSection";
import { genresLoading, getGenres } from "~/store/genresSlice";
import { AppDispatch } from "~/store/store";
import {
  getTopRatedMovies,
  topRatedMoviesLoading,
} from "~/store/topRatedMoviesSlice";
import { getTopRatedTV, topRatedTVLoading } from "~/store/topRatedTVSlice";
import { getTrendyMovies, trendyMoviesLoading } from "~/store/trendyMoviesSlice";
import { getTrendyTV, trendyTVLoading } from "~/store/trendyTVSlice";
import { getUpcomingMovies, upcomingMoviesLoading } from "~/store/upcomingMoviesSlice";
import { GenreTypes, MovieTypes } from "~/types/app";

export async function loader() {
  const [
    trendyMoviesRes,
    trendyTVRes,
    upcomingMoviesRes,
    genresRes,
    topMoviesRes,
    topTVRes,
  ] = await Promise.all([
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
    axios.get("https://api.themoviedb.org/3/tv/top_rated", {
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

  const topTV: {
    page: number;
    results: MovieTypes[];
    total_pages: number;
    total_results: number;
  } = await topTVRes.data;

  const upcomingMovies: {
    page: number;
    results: MovieTypes[];
    total_pages: number;
    total_results: number;
  } = await upcomingMoviesRes.data;

  const genres: GenreTypes[] = await genresRes.data.genres;

  return defer({
    trendyMovies,
    trendyTV,
    topMovies,
    topTV,
    upcomingMovies,
    genres,
  });
}

const _index = () => {
  const { trendyMovies, trendyTV, topMovies, topTV, upcomingMovies, genres } =
    useLoaderData<typeof loader>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigation();

  useEffect(() => {
    if (navigate.state === "loading") {
      dispatch(topRatedMoviesLoading());
      dispatch(trendyMoviesLoading());
      dispatch(topRatedTVLoading());
      dispatch(genresLoading());
      dispatch(upcomingMoviesLoading());
      dispatch(trendyTVLoading());
    }
    dispatch(getTrendyMovies(trendyMovies));
    dispatch(getTrendyTV(trendyTV));
    dispatch(getTopRatedMovies(topMovies));
    dispatch(getTopRatedTV(topTV));
    dispatch(getUpcomingMovies(upcomingMovies));
    dispatch(getGenres(genres));
  }, [
    dispatch,
    navigate.state,
    trendyMovies,
    trendyTV,
    topMovies,
    topTV,
    genres,
    upcomingMovies,
  ]);

  return (
    <>
      <HeroSection />
      <MoviesListSection
        title={"Trending Today"}
        variant={"trendy"}
        cats={["Movies", "Series"]}
      />
      <MoviesListSection title={"Upcomming"} variant={"upcomming"} />
      <MoviesListSection
        title={"Top rated"}
        variant={"rated"}
        cats={["Movies", "Series"]}
      />
    </>
  );
};

export default _index;
