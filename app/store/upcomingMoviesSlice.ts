import { createSlice } from "@reduxjs/toolkit";
import { MovieTypes } from "~/types/app";

export interface UpcomingMoviesState {
    page: number;
    results: MovieTypes[];
    total_pages: number;
    total_results: number;
    loading: boolean;
}

const initialState: UpcomingMoviesState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
    loading: true,
};

const upcomingMoviesSlice = createSlice({
    name: "upcomingMovies",
    initialState,
    reducers: {
        getUpcomingMovies: (state, action) => {
            state.loading = false;
            state.page = action.payload.page;
            state.results = action.payload.results;
            state.total_pages = action.payload.total_pages;
            state.total_pages = action.payload.total_pages;
        },
    },
});

export const { getUpcomingMovies } = upcomingMoviesSlice.actions;

export default upcomingMoviesSlice.reducer;
