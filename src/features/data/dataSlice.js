import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    dataset: [],
    selectedIds: []
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
        },
        selectIds: (state, action) => {
            state.selectedIds = action.payload;
        }

    },

});

export const {dataLoaded, transformationsLoaded, selectIds} = dataSlice.actions;


export const dataset = (state) => state.data.dataset;
export const transformations = (state) => state.data.transformations;

export const selectedItems = (state) => state.data.dataset.filter(
    (item) => state.data.selectedIds.includes(item['id'])
);

export default dataSlice.reducer;
