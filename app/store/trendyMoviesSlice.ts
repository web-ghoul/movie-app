import { createSlice } from "@reduxjs/toolkit";
import { MovieTypes } from "~/types/app";

export interface TrendyMoviesState {
  page: number;
  results: MovieTypes[];
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: boolean;
}

const initialState: TrendyMoviesState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: false,
};

const trendyMoviesSlice = createSlice({
  name: "trendyMovies",
  initialState,
  reducers: {
    trendyMoviesLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getTrendyMovies: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    trendyMoviesError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getTrendyMovies, trendyMoviesLoading, trendyMoviesError } =
  trendyMoviesSlice.actions;

export default trendyMoviesSlice.reducer;
