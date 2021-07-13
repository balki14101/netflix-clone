import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiClient from '../ApiClient';

// Actions
export const fetchMovieDetails = createAsyncThunk(
  'movie/fetchMovieDetails',
  ({movieId}) => ApiClient.get(`movie/${movieId}`),
);
export const fetchCrewData = createAsyncThunk(
  'movie/fetchCrewDetails',
  ({movieId}) => ApiClient.get(`movie/${movieId}/credits`),
);
export const fetchSimilarMovies = createAsyncThunk(
  'movie/fetchSimilarMovies',
  ({movieId}) => ApiClient.get(`movie/${movieId}/similar`),
);
export const fetchPopularMovies = createAsyncThunk(
  'movie/fetchPopularMovies',
  () => ApiClient.get('movie/popular'),
);

const a = 10;

const initialState = {
  popularMovies: [],
  detailsLoading: {}, // Key represents movieId, value is loading state
  details: {}, // Key represents movieId, value is movie details
  crew: {}, // Key represents movieId, value is crew details
  similarMovies: {}, // Key represents movieId, value is crew details
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMovieDetails.pending, (state, action) => {
      state.detailsLoading[action.meta.arg.movieId] = true;
    });
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.detailsLoading[action.meta.arg.movieId] = false;
      state.details[action.meta.arg.movieId] = action.payload;
    });
    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.detailsLoading[action.meta.arg.movieId] = false;
    });
    builder.addCase(fetchCrewData.fulfilled, (state, action) => {
      state.crew[action.meta.arg.movieId] = action.payload;
    });
    builder.addCase(fetchSimilarMovies.fulfilled, (state, action) => {
      state.similarMovies[action.meta.arg.movieId] = action.payload;
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popularMovies = action.payload.results;
    });
  },
});

// export const {} = movieSlice.actions;

export default movieSlice.reducer;
