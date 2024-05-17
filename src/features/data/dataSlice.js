import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    dataset: [],
};


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        dataLoaded: (state, action) => {
            state.dataset = action.payload;
        },
        transformationsLoaded: (state, action) => {
            state.transformations = action.payload;
        }

    },

});

export const {dataLoaded, transformationsLoaded} = dataSlice.actions;


export const dataset = (state) => state.data.dataset;
export const transformations = (state) => state.data.transformations;

export default dataSlice.reducer;
