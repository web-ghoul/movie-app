// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import trendyMoviesReducer from "./trendyMoviesSlice";
import topMoviesReducer from "./topRatedMoviesSlice";
import genresReducer from "./genresSlice";

export const store = configureStore({
  reducer: {
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
