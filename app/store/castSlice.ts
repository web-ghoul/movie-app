import { createSlice } from "@reduxjs/toolkit";
import { ActorTypes } from "~/types/app";

export interface CastState {
  cast: ActorTypes[];
  loading: boolean;
  error: boolean;
}

const initialState: CastState = {
  cast: [],
  loading: true,
  error: false,
};

const castSlice = createSlice({
  name: "cast",
  initialState,
  reducers: {
    castLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getCast: (state, action) => {
      state.loading = false;
      state.error = false;
      state.cast = action.payload;
    },
    castError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getCast, castError, castLoading } = castSlice.actions;

export default castSlice.reducer;
