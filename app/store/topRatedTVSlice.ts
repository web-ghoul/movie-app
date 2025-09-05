import { createSlice } from "@reduxjs/toolkit";
import { MovieTypes } from "~/types/app";

export interface TopRatedTVState {
    page: number;
    results: MovieTypes[];
    total_pages: number;
    total_results: number;
    loading: boolean;
}

const initialState: TopRatedTVState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
    loading: true,
};

const topRatedTVSlice = createSlice({
    name: "topRatedTV",
    initialState,
    reducers: {
        getTopRatedTV: (state, action) => {
            state.loading = false;
            state.page = action.payload.page;
            state.results = action.payload.results;
            state.total_pages = action.payload.total_pages;
            state.total_pages = action.payload.total_pages;
        },
    },
});

export const { getTopRatedTV } = topRatedTVSlice.actions;

export default topRatedTVSlice.reducer;
