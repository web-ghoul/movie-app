import { createSlice } from "@reduxjs/toolkit";
import { GenreTypes } from "~/types/app";

export interface GenresState {
  genres: GenreTypes[];
  loading: boolean;
  error: boolean;
}

const initialState: GenresState = {
  genres: [],
  loading: true,
  error: false,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    genresLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getGenres: (state, action) => {
      state.loading = false;
      state.genres = action.payload;
    },
    genresError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getGenres, genresLoading, genresError } = genresSlice.actions;

export default genresSlice.reducer;
