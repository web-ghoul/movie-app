import { createSlice } from "@reduxjs/toolkit";
import { MovieTypes } from "~/types/app";

export interface TrendyTVState {
  page: number;
  results: MovieTypes[];
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: boolean;
}

const initialState: TrendyTVState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: true,
};

const trendyTVSlice = createSlice({
  name: "trendyTV",
  initialState,
  reducers: {
    trendyTVLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getTrendyTV: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    trendyTVError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getTrendyTV, trendyTVError, trendyTVLoading } =
  trendyTVSlice.actions;

export default trendyTVSlice.reducer;
