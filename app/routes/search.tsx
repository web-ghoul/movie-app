import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoviesSection from "~/sections/MoviesSection/MoviesSection";
import SearchSection from "~/sections/SearchSection/SearchSection";
import { AppDispatch, RootState } from "~/store/store";
import { getTrendyMovies } from "~/store/trendyMoviesSlice";
import { MovieTypes } from "~/types/app";


export async function loader() {
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
  } = await trendyMoviesRes.data;

  return json({
    trendyMovies,
  });
}

const search = () => {
  const { results } = useSelector((state: RootState) => state.trendyMovies)
  const { trendyMovies } = useLoaderData<typeof loader>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTrendyMovies(trendyMovies));
  }, [dispatch]);

  return (
    <>
      <SearchSection />
      {
        results.length > 0 && <MoviesSection title={"Trending Today"} movies={results} />
      }
    </>
  )
}

export default search