import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PlayerState } from "./playerTypes";


// when loading app, this thunk will always fire to initialize the store with a dummy track
export const initializeStoreWithDummyTrack = createAsyncThunk('media/getDummyTrack', async (_, thunkAPI) => {
    try {
        const response = await fetch("/api/media/getDummyTrack")

        if (response.ok) {
            const data = await response.json();
            return data.track
        } else {
            const error = await response.json();
            console.error('fetch in thunk was successful, but didnt emit a successful res.status code')
            return thunkAPI.rejectWithValue(error);
        }
    } catch (e: any) {
        console.error("There was an issue performing fetch to /api/media/getDummyTrack")
        return thunkAPI.rejectWithValue(e.message)
    }
});

const initialState: PlayerState = { currentSong: null, songList: [], play: false }

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload
        },
        setSongList: (state, action) => {
            state.songList = action.payload
        },
        setPlay: (state, action) => {
            state.play = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeStoreWithDummyTrack.fulfilled, (state, action) => {
                state.currentSong = action.payload
                state.songList = [action.payload]
            })
    }
})

export const {setCurrentSong, setSongList, setPlay} = playerSlice.actions
export default playerSlice.reducer
