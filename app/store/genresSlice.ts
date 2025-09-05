import { createSlice } from "@reduxjs/toolkit";
import { GenreTypes } from "~/types/app";

export interface GenresState {
  genres: GenreTypes[];
  loading: boolean;
}

const initialState: GenresState = {
  genres: [],
  loading: true,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    getGenres: (state, action) => {
      state.loading = false;
      state.genres = action.payload;
    },
  },
});

export const { getGenres } = genresSlice.actions;

export default genresSlice.reducer;
