import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoviesSection from "~/sections/MoviesSection/MoviesSection";
import SearchSection from "~/sections/SearchSection/SearchSection";
import { AppDispatch, RootState } from "~/store/store";
import { getTrendyMovies } from "~/store/trendyMoviesSlice";
import { MovieTypes } from "~/types/app";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("search");
  const type = url.searchParams.get("type");

  if (query) {
    const url =
      type === "all"
        ? "https://api.themoviedb.org/3/search/multi"
        : type === "movie"
          ? "https://api.themoviedb.org/3/search/movie"
          : type === "tv"
            ? "https://api.themoviedb.org/3/search/tv"
            : "https://api.themoviedb.org/3/search/multi";

    const res = await axios.get(`${url}?query=${query}`, {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    });

    const searchResults: {
      page: number;
      results: MovieTypes[];
      total_pages: number;
      total_results: number;
    } = res.data;

    return defer({
      searchResults,
      query,
      trendyMovies: {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
    });
  }

  const [trendyMoviesRes] = await Promise.all([
    axios.get("https://api.themoviedb.org/3/trending/movie/day", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    }),
  ]);

  const trendyMovies: {
    page: number;
    results: MovieTypes[];
    total_pages: number;
    total_results: number;
  } = trendyMoviesRes.data;

  return defer({
    trendyMovies,
    query: "",
    searchResults: {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
  });
}

const search = () => {
  const { results, loading } = useSelector(
    (state: RootState) => state.trendyMovies
  );
  const { trendyMovies, searchResults, query } = useLoaderData<typeof loader>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTrendyMovies(trendyMovies));
  }, [dispatch, trendyMovies, searchResults, query]);

  return (
    <>
      <SearchSection />
      {query ? (
        <MoviesSection
          title={`Search Results for "${query}"`}
          movies={searchResults.results as MovieTypes[]}
        />
      ) : (
        <MoviesSection
          title={"Trending Today"}
          movies={results}
          loading={loading}
        />
      )}
    </>
  );
};

export default search;
