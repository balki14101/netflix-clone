import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiClient from '../ApiClient';

// Actions
export const fetchTvShowDetails = createAsyncThunk(
  'movie/fetchTvShowDetails',
  ({tvId}) => ApiClient.get(`tv/${tvId}`),
);

const initialState = {
  detailsLoading: {}, // Key represents movieId, value is loading state
  details: {}, // Key represents movieId, value is movie details
};

export const movieSlice = createSlice({
  name: 'TvShow',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTvShowDetails.pending, (state, action) => {
      state.detailsLoading[action.meta.arg.tvId] = true;
    });
    builder.addCase(fetchTvShowDetails.fulfilled, (state, action) => {
      state.detailsLoading[action.meta.arg.tvId] = false;
      state.details[action.meta.arg.tvId] = action.payload;
    });
    builder.addCase(fetchTvShowDetails.rejected, (state, action) => {
      state.detailsLoading[action.meta.arg.tvId] = false;
    });
  },
});

// export const {} = movieSlice.actions;

export default movieSlice.reducer;
