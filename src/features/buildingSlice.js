import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentBuilding: null,
    loading: false,
    error: false
}


export const buildingSlice = createSlice({
    name: "building",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = false
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentBuilding = action.payload;
        },
        fetchFailure: (state) => {
            state.loading = false;
            state.error = true;
        },

    }
})



export const { fetchStart,fetchSuccess, fetchFailure } = buildingSlice.actions;



export default buildingSlice.reducer;