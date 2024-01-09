import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LibraryState, Playlist, Artist, Album, UserLibrary } from "./libraryTypes";
import { NoUserPayload } from "../session/sessionTypes";

export const getUserLibraryThunk = createAsyncThunk( //! toolkit will automatically create an action creator function (with type & payload keys) on SUCCESSFUL thunk return
    'GET /api/library/',
    async( _ , thunkAPI) => { //! PARAM 1: req.body OBJECT for our fetch {...} PARAM 2: thunkAPI includes VERY useful methods such as ----> thunkAPI.getState() and thunkAPI.dispatch()
        try {
            // TODO d.) ---> sidebar might be different depending if user LOGGED IN WITH EMPTY library vs NO USER LOGGED IN (the tooltips are for sure at least)

            // TODO e.) ---> ADD BACK IN THE [loading, setLoading] = useState(null) ON REFRESH USER IN App.tsx (minimal impact tbh and necessary for protected components)
            // TODO f.) ---> Shouldnt be getting a 403 UserNotAuthenticated error just cause the user doesnt want to log in and see there dashboard. Fix this

            const response = await fetch('/api/library/');
            if(response.ok) {
                const data: UserLibrary | NoUserPayload = await response.json()
                const newState: LibraryState = { playlists: {}, albums: {}, artists: {}, isLoaded: false }

                if('isLoggedIn' in data) { // if no logged in user, send back an empty User Library state
                    return newState
                }

                //* Normalize User Library Store Data
                    data.userLibrary.playlists.forEach((playlist: Playlist) => {
                        newState.playlists[playlist._id] = playlist;
                    });
                    data.userLibrary.artists.forEach((artist: Artist) => {
                        newState.artists[artist._id] = artist;
                    });
                    data.userLibrary.albums.forEach((album: Album) => {
                        newState.albums[album._id] = album
                    });
                return newState
            } else {
                const error = await response.json()
                console.error('fetch in thunk was successful, but didnt emit a successful res.status code')
                return thunkAPI.rejectWithValue(error);
            }
        } catch (e: any) {
            console.error("There was an issue performing fetch to /api/library/")
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

const initialState = { playlists: {}, albums: {}, artists: {}, isLoaded: false } as LibraryState

const libraySlice = createSlice({ //! You CAN mutate state in the reducer due to abtracted iliner library that toolkit uses ( state must be either {} or [] )
    name: 'library',
    initialState,
    reducers: {}, //! If thunk middleware is not needed, you need to create your own ActionType + ActionCreatorFunction and handle the logic here instead of extraReducers
    extraReducers: (builder) => {
        builder.addCase(getUserLibraryThunk.pending, (state) => {  //* pending state doesnt 'need' to be defined here, but can be useful for debugging
            console.log("Promise returned by createAsyncThunk is in a pending state...")
        })
        builder.addCase(getUserLibraryThunk.fulfilled, (state, action) => {
            console.log("Promise returned by createAsyncThunk has been successfully resolved")
            const actionPayload = action.payload as LibraryState

            state.isLoaded = true
            state.playlists = actionPayload.playlists
            state.albums = actionPayload.albums
            state.artists = actionPayload.artists
        })
        builder.addCase(getUserLibraryThunk.rejected, (state, action) => {  //* rejcted state doesnt 'need' to be defined here, but can be useful for debugging
            const errorMessage = (action.payload as string)
            console.error(errorMessage)
        })
    }
})

export default libraySlice.reducer
