import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to grab quickplay grid
export const getQuickplayGridThunk = createAsyncThunk('dashboard/getQuickplayGrid', async (_, thunkAPI) => {
  try {
    const response = await fetch("/api/dashboard/quickplay");

    if (response.ok) {
      const data = await response.json();
      return data.quickplayGrid
    } else {
      const error = await response.json();
      console.error('fetch in thunk was successful, but didnt emit a successful res.status code')
      return thunkAPI.rejectWithValue(error);
    }
  } catch (e: any) {
    console.error("There was an issue performing fetch to /api/dashboard/quickplay")
    return thunkAPI.rejectWithValue(e.message)
  }
});

// Thunk to get all grid info
export const getGridInfo = createAsyncThunk('dashboard/gridInfo', async (_, thunkAPI) => {
  try {
    const response = await fetch("/api/dashboard/gridInfo");

    if (response.ok) {
      const data = await response.json();
      return data
    } else {
      const error = await response.json();
      console.error('fetch in thunk was successful, but didnt emit a successful res.status code')
      return thunkAPI.rejectWithValue(error);
    }
  } catch (e: any) {
    console.error("There was an issue performing fetch to /api/dashboard/gridInfo")
    return thunkAPI.rejectWithValue(e.message)
  }
});


// Create a slice for the session state
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { quickplayGrid: [], recommendedForToday: [], popularAlbums: [], popularArtists: [], recentlyViewed: [], isLoading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuickplayGridThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.quickplayGrid = action.payload;
      })
      .addCase(getGridInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.recommendedForToday = action.payload.recommendedAlbums;
        state.popularArtists = action.payload.popularArtists;
        state.recentlyViewed = action.payload.recentlyViewed;
      })
  },
});

export default dashboardSlice.reducer;
