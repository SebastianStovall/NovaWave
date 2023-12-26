import CustomError from "../../utils/CustomError"
import { AlbumModel } from "../models/Album"
import { ArtistModel } from "../models/Artist"
import { PlaylistModel } from "../models/Playlist"
import { TrackModel } from "../models/Track"

export const getTracks = async() => {
    try {
        const tracks = await TrackModel.find()
        return tracks
    } catch(e) {
        throw e
    }
}


export const getPlaylists = async() => {
    try {
        const playlists = await PlaylistModel.find()
        return playlists
    } catch(e) {
        throw e
    }
}


export const getAlbums = async() => {
    try {
        const albums = await AlbumModel.find()
        return albums
    } catch(e) {
        throw e
    }
}


export const getArtists = async() => {
    try {
        const artists = await ArtistModel.find()
        return artists
    } catch(e) {
        throw e
    }
}