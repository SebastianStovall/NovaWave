import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// thunk to retreive artist top songs when user navigates to artist page
export const retreiveArtistTopSongs = createAsyncThunk('artist/getTopSongs', async (artistId: string | undefined, thunkAPI) => {
  try {
    const response = await fetch("/api/artist/getTopSongs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({artistId: artistId}),
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
    console.error("There was an issue performing fetch to /api/artist/getTopSongs")
    return thunkAPI.rejectWithValue(e.message)
  }
});


export const retreiveArtistDiscography = createAsyncThunk('artist/getDiscography', async (artistId: string | undefined, thunkAPI) => {
  try {
    const response = await fetch("/api/artist/getDiscography", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({artistId: artistId}),
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
    console.error("There was an issue performing fetch to /api/artist/getDiscography")
    return thunkAPI.rejectWithValue(e.message)
  }
});


// Create a slice for the session state
const artistSlice = createSlice({
  name: "artist",
  initialState: { artistTopSongs: null, artistDiscography: null, isLoading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retreiveArtistTopSongs.fulfilled, (state, action) => {
        state.artistTopSongs = action.payload.songs
      })
      .addCase(retreiveArtistDiscography.fulfilled, (state, action) => {
        state.artistDiscography = action.payload.discography
      })
  },
});

export default artistSlice.reducer;
