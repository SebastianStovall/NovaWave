
// ACTION TYPES
export enum ActionTypes {
    GET_USER_LIBRARY = '/api/library/'
}


// PAYLOADS
export interface Track {
    track: string
    addedAt?: string
}

export interface Playlist {
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

export interface Album {
    _id: string
    title: string
    artistName: string
    artist: string
    yearReleased: number
    image: string
    length: string
    tracks: Track[]
    createdAt: string
    updatedAt: string
}

export interface Artist {
    _id: string
    name: string
    bannerImage: string
    aboutImage: string
    monthlyListeners: number
    description: string
    disography: string[]
}

export interface LibraryPayload {
    message: string
    userLibrary: {
        playlists: Playlist[]
        albums: Album[]
        artists: Artist[]
    }
}

// ACTION INTERFACES
export interface GetUserLibraryAction {
    type: ActionTypes.GET_USER_LIBRARY
    payload: LibraryPayload
}


// INITIAL STATE INTERFACE

export interface LibraryState {
    playlists: { [key: string]: Playlist }
    albums: { [key: string]: Album }
    artists: { [key: string]: Artist }
    isLoaded: Boolean
}
