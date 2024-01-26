import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Thunk to handle getting randomized quickplayGridInfo on user signup/login
export const generateQuickplayGridThunk = createAsyncThunk(
  "dashboard/quickplay/generate",
  async (_, thunkAPI) => {
    const currentState = thunkAPI.getState() as RootState;
    const quickplayValuesObject = currentState.persist.quickplayGrid
    try {
      const response = await fetch("/api/dashboard/quickplay/generate", {
        method: "POST",
        body: JSON.stringify(quickplayValuesObject),
        headers: {'Content-Type': 'application/json'}
      });
      if (response.ok) {
        const data = await response.json();
        return data.quickplayGrid;
      } else {
        const error = await response.json();
        console.error(
          "fetch in thunk was successful, but didnt emit a successful res.status code"
        );
        return thunkAPI.rejectWithValue(error);
      }
    } catch (e: any) {
      console.error(
        "There was an issue performing fetch to /api/dashboard/quickplay"
      );
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Recommended For Today
export const getRecommendedForTodayThunk = createAsyncThunk(
  "dashboard/recommended",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/dashboard/recommended", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        const error = await response.json();
        console.error(
          "fetch in thunk was successful, but didnt emit a successful res.status code"
        );
        return thunkAPI.rejectWithValue(error);
      }
    } catch (e: any) {
      console.error(
        "There was an issue performing fetch to /api/dashboard/recommended"
      );
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Create a slice for the session state
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { quickplayGrid: [], recommendedForToday: [], freshFinds: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateQuickplayGridThunk.fulfilled, (state, action) => {
        state.quickplayGrid = action.payload;
      })
      .addCase(getRecommendedForTodayThunk.fulfilled, (state, action) => {
        state.recommendedForToday = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
