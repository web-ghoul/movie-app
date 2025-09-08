import { createSlice } from "@reduxjs/toolkit";
import { MovieTypes } from "~/types/app";

export interface SimilarMoviesState {
  page: number;
  results: MovieTypes[];
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: boolean;
}

const initialState: SimilarMoviesState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: false,
};

const similarMoviesSlice = createSlice({
  name: "similarMovies",
  initialState,
  reducers: {
    similarMoviesLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSimilarMovies: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    similarMoviesError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getSimilarMovies, similarMoviesLoading, similarMoviesError } =
  similarMoviesSlice.actions;

export default similarMoviesSlice.reducer;
