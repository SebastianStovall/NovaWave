import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MediaThunkRequestBody } from "./mediaTypes";

// Thunk to update media info
export const updateCurrentMedia = createAsyncThunk('media/updateCurrent', async (mediaInfo: MediaThunkRequestBody, thunkAPI) => {
  try {
    const response = await fetch("/api/media/update", {
      method: "PATCH",
      body: JSON.stringify(mediaInfo),
    })

    if (response.ok) {
      const data = await response.json();
      return data.media
    } else {
      const error = await response.json();
      console.error('fetch in thunk was successful, but didnt emit a successful res.status code')
      return thunkAPI.rejectWithValue(error);
    }
  } catch (e: any) {
    console.error("There was an issue performing fetch to /api/media/update")
    return thunkAPI.rejectWithValue(e.message)
  }
});


// Create a slice for the session state
const mediaSlice = createSlice({
  name: "media",
  initialState: { current: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCurrentMedia.fulfilled, (state, action) => {
        state.current = action.payload;
      })
  },
});

export default mediaSlice.reducer;
