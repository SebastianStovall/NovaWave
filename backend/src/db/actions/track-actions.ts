import CustomError from "../../utils/CustomError"
import { AlbumModel } from "../models/Album"
import { ArtistModel } from "../models/Artist"
import { PlaylistModel } from "../models/Playlist"
import { TrackModel } from "../models/Track"

export const getTracks = async() => {
    try {
        const tracks = await TrackModel.find({}).populate({path: 'artist'}).populate({path: 'album'})
        return tracks
    } catch(e) {
        throw e
    }
}


export const getPlaylists = async() => {
    try {
        const playlists = await PlaylistModel.find({})
        return playlists
    } catch(e) {
        throw e
    }
}


export const getAlbums = async() => {
    try {
        const albums = await AlbumModel.find({}).populate({path: 'tracks'})
        return albums
    } catch(e) {
        throw e
    }
}


export const getArtists = async() => {
    try {
        const artists = await ArtistModel.find({}).populate({path: 'discography'})
        return artists
    } catch(e) {
        throw e
    }
}
