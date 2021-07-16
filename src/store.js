import {configureStore} from '@reduxjs/toolkit';
import movieReducer from './Reducers/Movie';
import tvReducer from './Reducers/TvShow';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
  },
});
