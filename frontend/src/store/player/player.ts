import { createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "./playerTypes";

const dummyTrack = {
    _id: "65c539be310ebe25c934a838",
    title: "KILLKA",
    length: "2:22",
    audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+KILLKA.mp3",
    image: "https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/KILLKA-Album-9.jfif",
    plays: 47259289,
    artist: "65c539be310ebe25c934a7e9",
    artistName: "fkbambam",
    artistAboutImage: "https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/fkbambam-ABOUT-Artist-5.jfif",
    artistMonthlyListeners: 851181,
    album: "65c539be310ebe25c934a7f2",
    albumName: "KILLKA"
}

// const dummyTrack2 = {
//     _id: "65c539be310ebe25c934a800",
//     title: "Can't Tell Me Nothing",
//     length: "4:31",
//     audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Can't+Tell+Me+Nothing.mp3",
//     image: "https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif",
//     plays: 490821294,
//     artist: "65c539be310ebe25c934a7e6",
//     artistName: "Kanye West",
//     artistAboutImage: "https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif",
//     artistMonthlyListeners: 64191521,
//     album: "65c539be310ebe25c934a7ec",
//     albumName: "Graduation"
// }

const initialState: PlayerState = { currentSong: dummyTrack, songList: [dummyTrack], play: false }

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
