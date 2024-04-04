import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// thunk to retreive artist top songs when user navigates to artist page
export const retreiveArtistTopSongs = createAsyncThunk(
  "artist/getTopSongs",
  async (artistId: string | undefined, thunkAPI) => {
    try {
      const response = await fetch("/api/artist/getTopSongs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId: artistId }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const error = await response.json();
        console.error(
          "fetch in thunk was successful, but didnt emit a successful res.status code"
        );
        return thunkAPI.rejectWithValue(error);
      }
    } catch (e: any) {
      console.error(
        "There was an issue performing fetch to /api/artist/getTopSongs"
      );
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const retreiveArtistInformation = createAsyncThunk(
  "artist/getArtistInfo",
  async (artistId: string | undefined, thunkAPI) => {
    try {
      const response = await fetch("/api/artist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId: artistId }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const error = await response.json();
        console.error(
          "fetch in thunk was successful, but didnt emit a successful res.status code"
        );
        return thunkAPI.rejectWithValue(error);
      }
    } catch (e: any) {
      console.error(
        "There was an issue performing fetch to /api/artist"
      );
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Create a slice for the session state
const artistSlice = createSlice({
  name: "artist",
  initialState: {
    artist: null,
    artistTopSongs: null,
    isLoading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retreiveArtistTopSongs.fulfilled, (state, action) => {
        state.artistTopSongs = action.payload.songs;
      })
      .addCase(retreiveArtistInformation.fulfilled, (state, action) => {
        state.artist = action.payload.artist;
      });
  },
});

export default artistSlice.reducer;
