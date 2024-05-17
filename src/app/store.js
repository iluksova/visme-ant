import {configureStore} from '@reduxjs/toolkit';
import optionsReducer from '../features/options/optionsSlice';
import dataReducer from '../features/data/dataSlice';


export const store = configureStore({
    reducer: {
        options: optionsReducer,
        data: dataReducer
    },
});




