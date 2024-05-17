import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  transformation: 'pca',
  visualization: 'scatter'
};


export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectTransformation: (state, action) => {
      state.transformation = action.payload;
    },
    selectVisualization: (state, action) => {
      state.visualization = action.payload;
    }
  },

});

export const { selectTransformation, selectVisualization } = optionsSlice.actions;


export const transformation = (state) => state.options.transformation;
export const visualization = (state) => state.options.visualization;



export default optionsSlice.reducer;
