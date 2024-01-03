// Define Our Action Types with enum
enum ActionTypes {
    GET_USER_PLAYLISTS = '/api/playlists'
}


// Payload Types
interface Track {
    track: string
    addedAt: string
}
interface UserPlaylists { // user playlist payload interface
    _id: string
    owner: string
    likes: number
    title: string
    desc: string
    length: string
    isPrivate: boolean
    tracks: Track[]
    createdAt: string
    updatedAt: string
    __v: number
}

// Action Interfaces
interface GetUserPlaylistsAction {
    type: ActionTypes.GET_USER_PLAYLISTS
    payload: UserPlaylists[]
}

// Actions
export const userPlaylists = (playlists: UserPlaylists[]): GetUserPlaylistsAction => {
    return {
        type: ActionTypes.GET_USER_PLAYLISTS,
        payload: playlists
    }
}


// THUNKS

export const getUserPlaylistsThunk = () => async (dispatch: Function) => {
    try {
        const response = await fetch("/api/playlists");

        if (response.ok) {
            const data = await response.json();
            dispatch(userPlaylists(data))
        } else {
            const error = await response.json();
            console.log(error)
        }
    } catch (e: any) {
        console.error("Error While Performing Thunk", e);
    }
};


// Define an initial state
interface PlaylistState { [key: string]: UserPlaylists }

const initialState: PlaylistState = {};

// Define session reducer
const playlistReducer = (
    state: PlaylistState = initialState,
    action: GetUserPlaylistsAction
    ) => {
    let newState: PlaylistState;
    switch (action.type) {
        case ActionTypes.GET_USER_PLAYLISTS:
            newState = { ...state };
            action.payload.forEach((playlist) => {
                newState[playlist._id] = playlist;
            });
            return newState;
        default:
            return state;
    }
};

export default playlistReducer;
