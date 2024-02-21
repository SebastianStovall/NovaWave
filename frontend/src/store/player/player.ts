import { createSlice } from "@reduxjs/toolkit";

export interface TrackInterface {
    title: string
    length: string
    audio: string
    image: string
    plays: number

    artist: string
    artistName: string
    artistAboutImage: string
    artistMonthlyListeners: number

    album: string
    albumName: string
}

interface PlayerState {
    currentSong: null | TrackInterface
    songList: [] | TrackInterface[]
    play: boolean
}

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
})

export const {setCurrentSong, setSongList, setPlay} = playerSlice.actions
export default playerSlice.reducer
