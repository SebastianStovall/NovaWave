import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MediaThunkRequestBody, Safeuser } from "./mediaTypes";
import { RootState } from "../store";

// Thunk to update media info
export const updateCurrentMedia = createAsyncThunk('media/updateCurrent', async (mediaInfo: MediaThunkRequestBody, thunkAPI) => {
  if(mediaInfo.mediaType === 'playlist') { // if playlist, change mediaId to user likedSongsPlaylistId
    const state = (thunkAPI.getState() as RootState)!
    const user = (state.session.user as unknown as Safeuser)
    mediaInfo.mediaId = user.likedSongsPlaylistId
  }

  try {
    const response = await fetch("/api/media/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mediaInfo),
    })

    if (response.ok) {
      const data = await response.json();
      return data
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
  initialState: { albumData: null, playlistData: null, artistData: null, isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCurrentMedia.fulfilled, (state, action) => {
        state.isLoading = false
        if(action.payload.type === 'album') {
          state.albumData = action.payload.media
        } else if (action.payload.type === 'playlist') {
          state.playlistData = action.payload.media
        } else if (action.payload.type === 'artist') {
          state.artistData = action.payload.media
        }
      })
  },
});

export default mediaSlice.reducer;
