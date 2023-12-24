import { RequestHandler } from "express";
import { initNewPlaylist, getPlaylistsByUserId, addTrack } from "../db/actions/playlist-actions";
import CustomError from "../utils/CustomError";
import { get } from "lodash";


export const getUserPlaylists: RequestHandler = async (req, res, next) => {
    try {
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field
        const userPlaylists = await getPlaylistsByUserId(currentUserId)

        res.status(200).json(userPlaylists)

    } catch (e) {
        next(e)
    }
};


export const createNewPlaylist: RequestHandler = async (req, res, next) => {
    try {
        const userId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field
        const userPlaylists = get(req, "identity.playlists") as unknown as Array<string>; // key into identify and grab ._id field

        await initNewPlaylist(userId, userPlaylists.length)

        res.status(201).json({ message: 'Successfully Created Playlist' })
    } catch (e) {
        next(e)
    }
};


export const addTrackToPlaylist: RequestHandler = async(req, res, next) => {
    try {
        const { trackId, playlistId } = req.body

        if(!trackId) {
            throw new CustomError(
                "MissingTrackId",
                "Track ID is missing in the request body",
                400
            );
        }
        if(!playlistId) {
            throw new CustomError(
                "MissingPlaylistId",
                "Playlist ID is missing in the request body",
                400
            );
        }

        await addTrack(trackId, playlistId)
        res.status(201).json({ message: `Track ${trackId} added to playlist ${playlistId} successfully` });

    } catch(e) {
        next(e)
    }
}
