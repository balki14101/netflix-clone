import {configureStore} from '@reduxjs/toolkit';
import movieReducer from './Reducers/Movie';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});
