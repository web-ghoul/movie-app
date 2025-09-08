import { createSlice } from "@reduxjs/toolkit";
import { MovieTypes, VideoTypes } from "~/types/app";

export interface MovieState {
  movie?: MovieTypes;
  videos: VideoTypes[];
  loading: boolean;
  error: boolean;
}

const initialState: MovieState = {
  movie: undefined,
  videos: [],
  loading: true,
  error: false,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    movieLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getMovie: (state, action) => {
      state.loading = false;
      state.error = false;
      state.movie = action.payload.movie;
      state.videos = action.payload.videos;
    },
    movieError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getMovie, movieError, movieLoading } = movieSlice.actions;

export default movieSlice.reducer;
