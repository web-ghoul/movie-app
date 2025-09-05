// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "./genresSlice";
import topMoviesReducer from "./topRatedMoviesSlice";
import topTVReducer from "./topRatedTVSlice";
import trendyMoviesReducer from "./trendyMoviesSlice";
import trendyTVReducer from "./trendyTVSlice";
import upcomingMoviesReducer from "./upcomingMoviesSlice";

export const store = configureStore({
  reducer: {
    trendyTV: trendyTVReducer,
    trendyMovies: trendyMoviesReducer,
    topRatedTV: topTVReducer,
    topRatedMovies: topMoviesReducer,
    upcomingMovies: upcomingMoviesReducer,
    genres: genresReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
