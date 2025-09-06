import { createSlice } from "@reduxjs/toolkit";
import { MovieTypes } from "~/types/app";

export interface TopRatedMoviesState {
  page: number;
  results: MovieTypes[];
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: boolean;
}

const initialState: TopRatedMoviesState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: false,
};

const topRatedMoviesSlice = createSlice({
  name: "topRatedMovies",
  initialState,
  reducers: {
    topRatedMoviesLoading: (state) => {
      state.loading = true
      state.error = false
    },
    getTopRatedMovies: (state, action) => {
      state.loading = false;
      state.error = false
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    topRatedMoviesError: (state) => {
      state.loading = false
      state.error = true
    },
  },
});

export const { getTopRatedMovies, topRatedMoviesLoading, topRatedMoviesError } = topRatedMoviesSlice.actions;

export default topRatedMoviesSlice.reducer;
