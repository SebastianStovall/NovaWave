import { ObjectId } from "mongodb"

export interface AlbumDocument {
    _id: ObjectId
    title: string
    artistName: string
    artist: ObjectId
    yearReleased: number
    image: string
    tracks: string
    length: string
}

export interface ArtistDocument {
    _id: ObjectId
    name: string
    bannerImage: string
    aboutImage: string
    monthlyListeners: number
    description: string
    discography: ObjectId[]
}

export interface PlaylistDocument {
    _id: ObjectId
    owner: ObjectId
    likes: number
    title: string
    desc: string
    tracks: {track: ObjectId, date: Date}
    length: string
    isPrivate: boolean
}

export interface UserDocument {
    _id: ObjectId
    username: string
    email: string
    playlists: ObjectId[]
    albums: ObjectId[]
    artists: ObjectId[]
    likedSongsPlaylistId: ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface UserDocumentPopulatedWithLikedSongs {
    _id: ObjectId
    username: string
    email: string
    playlists: ObjectId[]
    albums: ObjectId[]
    artists: ObjectId[]
    likedSongsPlaylistId: PlaylistDocument
    createdAt: Date
    updatedAt: Date
}
