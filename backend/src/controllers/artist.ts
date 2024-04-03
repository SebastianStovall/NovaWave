import { RequestHandler } from "express";
import CustomError from "../utils/CustomError";
import { getTopSongs, getDiscography } from "../db/actions/media-actions";

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

export const getArtistDiscography: RequestHandler = async(req, res, next) => {
    try {
        const { artistId } = req.body;

        if(!artistId) {
            throw new CustomError(
                "Bad Request",
                "Entity information is missing in the request body",
                400
            );
        }

        const discography = await getDiscography(artistId)
        return res.status(200).json({ message: `Successfully Retreived artist discography`, discography: discography});

    } catch(e) {
        next(e)
    }
}
