import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  transformation: 'pca',
};


export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectTransformation: (state, action) => {
      state.transformation = action.payload;
    }
  },

});

export const { selectTransformation } = optionsSlice.actions;


export const transformation = (state) => state.options.transformation;



export default optionsSlice.reducer;
