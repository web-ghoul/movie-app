import { createSlice } from "@reduxjs/toolkit";
import { MovieTypes } from "~/types/app";

export interface TopRatedTVState {
  page: number;
  results: MovieTypes[];
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: boolean;
}

const initialState: TopRatedTVState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: false,
};

const topRatedTVSlice = createSlice({
  name: "topRatedTV",
  initialState,
  reducers: {
    topRatedTVLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getTopRatedTV: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    topRatedTVError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getTopRatedTV, topRatedTVError, topRatedTVLoading } =
  topRatedTVSlice.actions;

export default topRatedTVSlice.reducer;
