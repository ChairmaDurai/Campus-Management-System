import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentCampus: null,
    loading: false,
    error: false
}


export const campusSlice = createSlice({
    name: "campus",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = false
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentCampus = action.payload;
        },
        fetchFailure: (state) => {
            state.loading = false;
            state.error = true;
        },

    }
})



export const { fetchStart,fetchSuccess, fetchFailure } = campusSlice.actions;



export default campusSlice.reducer;