import {ActionTypes, LibraryPayload, GetUserLibraryAction, LibraryState} from './libraryTypes'

// Actions
export const userLibrary = (library: LibraryPayload): GetUserLibraryAction => {
    return {
        type: ActionTypes.GET_USER_LIBRARY,
        payload: library
    }
}


// THUNKS
export const getUserLibraryThunk = () => async (dispatch: Function) => {
    try {
        const response = await fetch("/api/library");

        if (response.ok) {
            const data = await response.json();
            dispatch(userLibrary(data))
        } else {
            const error = await response.json();
            console.log(error)
        }
    } catch (e: any) {
        console.error("Error While Performing Thunk", e);
    }
};


// Define an initial state
const initialState: LibraryState = { playlists: {}, albums: {}, artists: {} };

// Define session reducer
const libraryReducer = (
    state: LibraryState = initialState,
    action: GetUserLibraryAction
    ) => {
    switch (action.type) {
        case ActionTypes.GET_USER_LIBRARY:
            const newState = { ...state };
            action.payload.userLibrary.playlists.forEach((playlist) => {
                newState.playlists = {
                    ...newState.playlists,
                    [playlist._id]: playlist,
                };
            });

            action.payload.userLibrary.albums.forEach((album) => {
                newState.albums = {
                    ...newState.albums,
                    [album._id]: album,
                };
            });

            action.payload.userLibrary.artists.forEach((artist) => {
                newState.artists = {
                    ...newState.artists,
                    [artist._id]: artist,
                };
            });
            return newState;
        default:
            return state;
    }
};


export default libraryReducer;
