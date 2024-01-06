import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LibraryState } from "./libraryTypes";

export const getUserLibraryThunk = createAsyncThunk(
    'library/getUserLibrary',
    async( _ , thunkAPI) => {
        try {

            console.log("IN THUNK...")
            const response = await fetch('/api/library'); // Replace with your actual API call
            if(response.ok) {
                const data = await response.json()
                const newState: LibraryState = { playlists: {}, albums: {}, artists: {}, isLoaded: false }

                // Normalize playlists
                    data.userLibrary.playlists.forEach((playlist: any) => {
                        newState.playlists[playlist._id] = playlist;
                    });

                // Normalize artists
                    data.userLibrary.artists.forEach((artist: any) => {
                        newState.artists[artist._id] = artist;
                    });

                // Normalize albums
                    data.userLibrary.albums.forEach((album: any) => {
                        newState.albums[album._id] = album
                    });
                return newState
            } else {
                const error = await response.json()
                console.error(error.message)
                return thunkAPI.rejectWithValue({ error: error.message });
            }
        } catch (e: any) {
            console.error("Error While Performing Thunk", e.message);
        }
    }
)

const initialState = { playlists: {}, albums: {}, artists: {}, isLoaded: false } as LibraryState

const libraySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserLibraryThunk.fulfilled, (state, action) => {
            state.playlists = ((action.payload as LibraryState).playlists)
            state.albums = ((action.payload as LibraryState).albums)
            state.artists = ((action.payload as LibraryState).artists)
            state.isLoaded = true
        })
    }
})

export default libraySlice.reducer
