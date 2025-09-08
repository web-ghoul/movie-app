import { createSlice } from "@reduxjs/toolkit";
import { MovieTypes } from "~/types/app";

export interface UpcomingMoviesState {
  page: number;
  results: MovieTypes[];
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: boolean;
}

const initialState: UpcomingMoviesState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: false,
};

const upcomingMoviesSlice = createSlice({
  name: "upcomingMovies",
  initialState,
  reducers: {
    upcomingMoviesLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getUpcomingMovies: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    upcomingMoviesError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getUpcomingMovies, upcomingMoviesError, upcomingMoviesLoading } =
  upcomingMoviesSlice.actions;

export default upcomingMoviesSlice.reducer;
