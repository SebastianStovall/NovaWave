import { RequestHandler } from "express";
import { getTracks, getPlaylists, getAlbums, getArtists } from "../db/actions/track-actions";
import CustomError from "../utils/CustomError";


export const getAllTracks: RequestHandler = async(req, res, next) => {
    try {
        const tracks = await getTracks()
        return res.status(200).json(tracks)
    } catch(e) {
        next(e)
    }
}


export const getAllPlaylists: RequestHandler = async(req, res, next) => {
    try {
        const playlists = await getPlaylists()
        return res.status(200).json(playlists)
    } catch (e) {
        next(e)
    }
}

export const getAllAlbums: RequestHandler = async(req, res, next) => {
    try {
        const albums = await getAlbums()
        return res.status(200).json(albums)
    } catch (e) {
        next(e)
    }
}


export const getAllArtists: RequestHandler = async(req, res, next) => {
    try {
        const artists = await getArtists()
        return res.status(200).json(artists)
    } catch (e) {
        next(e)
    }
}
