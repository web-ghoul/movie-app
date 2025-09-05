import { createSlice } from "@reduxjs/toolkit";
import { MovieTypes } from "~/types/app";

export interface TopRatedMoviesState {
  page: number;
  results: MovieTypes[];
  total_pages: number;
  total_results: number;
  loading: boolean;
}

const initialState: TopRatedMoviesState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
};

const topRatedMoviesSlice = createSlice({
  name: "topRatedMovies",
  initialState,
  reducers: {
    getTopRatedMovies: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
  },
});

export const { getTopRatedMovies } = topRatedMoviesSlice.actions;

export default topRatedMoviesSlice.reducer;
