import { RequestHandler } from "express";
import CustomError from "../utils/CustomError";
import { getTopSongs, getArtistInfo } from "../db/actions/artist-actions";

export const getArtistTopSongs: RequestHandler = async(req, res, next) => {
    try {
        const { artistId } = req.body;

        if(!artistId) {
            throw new CustomError(
                "Bad Request",
                "Entity information is missing in the request body",
                400
            );
        }

        const songs = await getTopSongs(artistId)
        return res.status(200).json({ message: `Successfully Retreived Top Songs for artist`, songs: songs});

    } catch(e) {
        next(e)
    }
}

export const getArtistInformation: RequestHandler = async(req, res, next) => {
    try {
        const { artistId } = req.body;

        if(!artistId) {
            throw new CustomError(
                "Bad Request",
                "Entity information is missing in the request body",
                400
            );
        }

        const artist = await getArtistInfo(artistId)
        return res.status(200).json({ message: `Successfully Retreived artist information`, artist: artist});

    } catch(e) {
        next(e)
    }
}
