import { RequestHandler } from "express";
import CustomError from "../utils/CustomError";
import { getMediaInfo, getTopSongs } from "../db/actions/media-actions";
import { ArtistDocument, AlbumDocument, PlaylistDocument } from "../db/models/modelTypes";


export const updateCurrentMedia: RequestHandler = async(req, res, next) => {
    try {
        const { mediaType, mediaId } = req.body;

        if(!mediaId || !mediaType) {
            throw new CustomError(
                "Bad Request",
                "Entity information is missing in the request body",
                400
            );
        }

        if(mediaType !== 'artist' && mediaType !== 'album' && mediaType !== 'playlist') {
            throw new CustomError(
                "Bad Request",
                `Media type ${mediaType} is invalid`,
                400
            );
        }

        const mediaInfo: ArtistDocument | AlbumDocument | PlaylistDocument = await getMediaInfo(mediaId, mediaType)
        return res.status(200).json({ message: `Successfully Retreived ${mediaType} info from backend database`, media: mediaInfo, type: mediaType});

    } catch(e) {
        next(e)
    }
}


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
