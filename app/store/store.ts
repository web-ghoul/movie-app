// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import genresReducer from "./genresSlice";
import topMoviesReducer from "./topRatedMoviesSlice";
import topTVReducer from "./topRatedTVSlice";
import trendyMoviesReducer from "./trendyMoviesSlice";
import trendyTVReducer from "./trendyTVSlice";
import upcomingMoviesReducer from "./upcomingMoviesSlice";
import similarMoviesReducer from "./similarMoviesSlice";
import castReducer from "./castSlice";

export const store = configureStore({
  reducer: {
    trendyTV: trendyTVReducer,
    trendyMovies: trendyMoviesReducer,
    topRatedTV: topTVReducer,
    topRatedMovies: topMoviesReducer,
    upcomingMovies: upcomingMoviesReducer,
    similarMovies: similarMoviesReducer,
    genres: genresReducer,
    movie: movieReducer,
    cast: castReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
