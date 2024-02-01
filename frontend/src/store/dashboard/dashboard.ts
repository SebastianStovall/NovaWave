import { createSlice } from "@reduxjs/toolkit";


// Create a slice for the session state
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { quickplayGrid: [], recommendedForToday: [], freshFinds: [] },
  reducers: {},
  extraReducers: (builder) => {
    // builder
      // .addCase(generateQuickplayGridThunk.fulfilled, (state, action) => {
      //   state.quickplayGrid = action.payload;
      // })
      // .addCase(getRecommendedForTodayThunk.fulfilled, (state, action) => {
      //   state.recommendedForToday = action.payload;
      // });
  },
});

export default dashboardSlice.reducer;
