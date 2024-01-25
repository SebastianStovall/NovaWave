import { ObjectId } from "mongodb"

export interface AlbumDocument {
    _id: ObjectId
    title: String
    artistName: String
    artist: ObjectId
    yearReleased: Number
    image: String
    tracks: String
    length: String
}

export interface ArtistDocument {
    _id: ObjectId
    name: String
    bannerImage: String
    aboutImage: String
    monthlyListeners: Number
    description: String
    discography: ObjectId[]
}

export interface PlaylistDocument {
    _id: ObjectId
    owner: ObjectId
    likes: Number
    title: String
    desc: String
    tracks: {track: ObjectId, date: Date}
    length: String
    isPrivate: boolean
}

export interface UserDocument {
    _id: ObjectId
    username: String
    email: String
    playlists: ObjectId[]
    albums: ObjectId[]
    artists: ObjectId[]
    likedSongsPlaylistId: ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface UserDocumentPopulatedWithLikedSongs {
    _id: ObjectId
    username: String
    email: String
    playlists: ObjectId[]
    albums: ObjectId[]
    artists: ObjectId[]
    likedSongsPlaylistId: PlaylistDocument
    createdAt: Date
    updatedAt: Date
}
