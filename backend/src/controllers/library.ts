import { RequestHandler } from "express";
import { addToLibrary, removeFromLibrary } from "../db/actions/playlist-actions";
import CustomError from "../utils/CustomError";
import { get } from "lodash";


// Adds a playlist or album or artist to user's library
export const addEntityToLibrary: RequestHandler = async(req, res, next) => {
    try {
        const { entityId, entityType, entityOwnerId } = req.body; // (***NOTE) entityOwnerId is for playlists ONLY
        const currentUserId = (get(req, "identity._id") as unknown as string); // key into identify and grab ._id field

        if(!entityId || !entityType) {
            throw new CustomError(
                "Bad Request",
                "Entity information is missing in the request body",
                400
            );
        }

        if (entityType !== 'playlist' && entityType !== 'album' && entityType !== 'artist') {
            throw new CustomError("Bad Request", "Entity type may only be 'playlist, 'album', or 'artist", 400);
        }

        if(entityType === 'playlist' && entityOwnerId && entityOwnerId === currentUserId.toString()) { // WHEN TESTING IN FRONTEND, MAKE SURE THESE ARE BEING COMPARED THE SAME WAY (string === string NOT objectId(string) === string)
            return res.status(200).json({ message: `This playlist is already in your Library` });
        }

        await addToLibrary(entityId, entityType, currentUserId, entityOwnerId) // entityOwnerId will be undefined unless adding playlist
        return res.status(200).json({ message: `Successfully Added ${entityType} to User Library` });

    } catch(e) {
        next(e)
    }
}


// Removes a playlist or album or artist from a user's library
export const removeEntityFromLibrary: RequestHandler = async(req, res, next) => {
    try {
        const { entityId, entityType } = req.body;
        const currentUserId = get(req, "identity._id") as unknown as string // key into identify and grab ._id field
        const userLikedSongsPlaylistId = get(req, "identity.likedSongsPlaylistId") as unknown as string

        if (!entityId || !entityType) {
            throw new CustomError("Bad Request", "Entity information is missing in the request body", 400);
        }

        if (entityType !== 'playlist' && entityType !== 'album' && entityType !== 'artist') {
            throw new CustomError("Bad Request", "Entity type may only be 'playlist, 'album', or 'artist", 400);
        }

        if(entityId === userLikedSongsPlaylistId.toString()) { // might need to change when testing on frontend...
            throw new CustomError(
                "Forbidden",
                "Cannot delete Liked Songs playlist. Each user must have one",
                403
            )
        }

        await removeFromLibrary(entityId, entityType, currentUserId)
        return res.status(200).json({ message: `Successfully Removed ${entityType} from User Library` });

    } catch(e) {
        next(e)
    }
}
