import { RequestHandler } from "express";
import CustomError from "../utils/CustomError";
import { getMediaInfo } from "../db/actions/media-actions";
import { ArtistDocument, AlbumDocument, PlaylistDocument } from "../db/models/modelTypes";


export const updateCurrentMedia: RequestHandler = async(req, res, next) => {
    try {
        const { mediaInformation } = req.body;

        if(!mediaInformation) {
            throw new CustomError(
                "Bad Request",
                "Entity information is missing in the request body",
                400
            );
        }

        if(mediaInformation.mediaType !== 'artist' && mediaInformation.mediaType !== 'album' && mediaInformation.mediaType !== 'playlist') {
            throw new CustomError(
                "Bad Request",
                `Media type ${mediaInformation.mediaType} is invalid`,
                400
            );
        }

        const mediaInfo: ArtistDocument | AlbumDocument | PlaylistDocument = await getMediaInfo(mediaInformation.mediaId, mediaInformation.mediaType)
        return res.status(200).json({ message: `Successfully Retreived ${mediaInformation.mediaType} info from backend database`, media: mediaInfo});

    } catch(e) {
        next(e)
    }
}
