import { RequestHandler } from "express";
import CustomError from "../utils/CustomError";
import { getMediaInfo, getTrack } from "../db/actions/media-actions";
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

        const [mediaInfo, artistImg] = await getMediaInfo(mediaId, mediaType)
        return res.status(200).json({ message: `Successfully Retreived ${mediaType} info from backend database`, media: mediaInfo, type: mediaType, artistImg: artistImg});

    } catch(e) {
        next(e)
    }
}

export const grabDummyTrack: RequestHandler = async(req, res, next) => {
    try {
        const dummyTrack = await getTrack()
        return res.status(200).json({ message: `Successfully Retreived dummy track`, track: dummyTrack});

    } catch(e) {
        next(e)
    }
}
