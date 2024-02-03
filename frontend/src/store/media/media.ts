import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to grab quickplay grid
// export const updateCurrentMedia = createAsyncThunk('media/updateCurrent', async (_, thunkAPI) => {
//   try {
//     const response = await fetch("/api/dashboard/quickplay");

//     if (response.ok) {
//       const data = await response.json();
//       return data.quickplayGrid
//     } else {
//       const error = await response.json();
//       console.error('fetch in thunk was successful, but didnt emit a successful res.status code')
//       return thunkAPI.rejectWithValue(error);
//     }
//   } catch (e: any) {
//     console.error("There was an issue performing fetch to /api/dashboard/quickplay")
//     return thunkAPI.rejectWithValue(e.message)
//   }
// });


// Create a slice for the session state
const mediaSlice = createSlice({
  name: "media",
  initialState: { current: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
    //   .addCase(getQuickplayGridThunk.fulfilled, (state, action) => {
    //     state.quickplayGrid = action.payload;
    //   })
  },
});

export default mediaSlice.reducer;
