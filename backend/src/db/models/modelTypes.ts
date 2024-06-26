import { ObjectId } from "mongodb"

export interface AlbumDocument {
    _id: ObjectId
    title: string
    artistName: string
    artist?: ObjectId | null | undefined
    yearReleased: number
    image?: string | null | undefined
    tracks: ObjectId[]
    length: string
    createdAt: Date
    updatedAt: Date
}

export interface ArtistDocument {
    _id: ObjectId
    name: string
    bannerImage: string
    aboutImage: string
    monthlyListeners: number
    description: string
    discography: ObjectId[]
    createdAt: Date
    updatedAt: Date
}

export interface ArtistDocumentPopulated {
    _id: ObjectId
    name: string
    bannerImage: string
    aboutImage: string
    monthlyListeners: number
    description: string
    discography?: AlbumDocument[] | undefined
    createdAt: Date
    updatedAt: Date
}

interface Track {
    track: ObjectId, date: Date
}

export interface PlaylistDocument {
    _id: ObjectId
    owner: ObjectId
    likes: number
    title: string
    desc: string
    tracks: Track[]
    length: string
    isPrivate: boolean
    createdAt: Date
    updatedAt: Date
}

export interface UserDocument {
    _id: ObjectId
    username: string
    email: string
    playlists: ObjectId[]
    albums: ObjectId[]
    artists: ObjectId[]
    likedSongsPlaylistId?: ObjectId | null | undefined
    recentlyViewed: ObjectId[]
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

export interface TrackDocument {
    _id: ObjectId
    title: string
    length: string
    audio: string
    image: string
    plays: number

    artist: ObjectId
    artistName: string
    artistAboutImage: string
    artistMonthlyListeners: number

    album?: ObjectId | null
    albumName?: string | null
}
