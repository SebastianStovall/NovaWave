import { RequestHandler } from "express";
import { initNewPlaylist, getPlaylistsByUserId } from "../db/actions/playlist-actions";
import CustomError from "../utils/CustomError";
import { get } from "lodash";


export const createNewPlaylist: RequestHandler = async (req, res, next) => {
    try {
        const userId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field
        const userPlaylists = get(req, "identity.playlists") as unknown as Array<string>; // key into identify and grab ._id field

        const playlist = await initNewPlaylist(userId, userPlaylists.length)

        if(!playlist) {
            throw new CustomError(
                "CreationError",
                "Error while creating new playlist",
                500
            );
        }

        res.status(201).json({message: 'Successfully Created Playlist'})

    } catch (e: any) {
        next(e)
    }
};



export const getUserPlaylists: RequestHandler = async (req, res, next) => {
    try {
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field

        const userPlaylists = await getPlaylistsByUserId(currentUserId)
        if(!userPlaylists) {
            throw new CustomError(
                "QueryError",
                "Error while retreiving user playlists",
                500
            );
        }

        res.status(200).json(userPlaylists)

    } catch (e: any) {
        next(e)
    }
};
