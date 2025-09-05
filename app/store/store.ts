// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "./genresSlice";
import topMoviesReducer from "./topRatedMoviesSlice";
import trendyMoviesReducer from "./trendyMoviesSlice";
import trendyTVReducer from "./trendyTVSlice";

export const store = configureStore({
  reducer: {
    trendyTV: trendyTVReducer,
    trendyMovies: trendyMoviesReducer,
    topRatedMovies: topMoviesReducer,
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
