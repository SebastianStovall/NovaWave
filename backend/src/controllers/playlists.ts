import { RequestHandler } from "express";
import { initNewPlaylist, getPlaylistsByUserId, addTrack, removeTrack } from "../db/actions/playlist-actions";
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
        const username = get(req, "identity.username") as unknown as string;
        const userPlaylists = get(req, "identity.playlists") as unknown as Array<string>; // key into identify and grab ._id field

        await initNewPlaylist(userId, userPlaylists.length, username)

        res.status(201).json({ message: 'Successfully Created Playlist' })
    } catch (e) {
        next(e)
    }
};


// handles adding tracks to regular playlists AND liked songs playlists
export const addTrackToPlaylist: RequestHandler = async(req, res, next) => {
    try {
        const { trackId, playlistId } = req.body
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field
        const userLikedSongsPlaylistId = get(req, "identity.likedSongsPlaylistId") as unknown as string; // key into identify and grab ._id field

        if(!trackId || !playlistId) {
            throw new CustomError(
                "Bad Request",
                "Track ID or Playlist ID is missing in the request body",
                400
            );
        }

        const trackAdded = await addTrack(trackId, playlistId, currentUserId)

        if(playlistId === userLikedSongsPlaylistId.toString()) {
            if (trackAdded) {
                return res.status(201).json({ message: `Track added to Liked Songs playlist` });
            } else {
                return res.status(200).json({ message: `Track already in liked songs` });
            }
        } else {
            if (trackAdded) {
                return res.status(201).json({ message: `Track added to playlist ${playlistId}` });
            } else {
                return res.status(200).json({ message: `Track already in playlist` });
            }
        }

    } catch(e) {
        next(e)
    }
}


export const removeTrackFromPlaylist: RequestHandler = async (req, res, next) => {
    try {
        const { trackId, playlistId } = req.body
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field
        const userLikedSongsPlaylistId = get(req, "identity.likedSongsPlaylistId") as unknown as string; // key into identify and grab ._id field

        if(!trackId || !playlistId) {
            throw new CustomError(
                "Bad request",
                "Track ID or Playlist Id is missing in the request body",
                400
            );
        }

        await removeTrack(trackId, playlistId, currentUserId)

        if( playlistId === userLikedSongsPlaylistId.toString() ) {
            return res.status(200).json({ message: `Track has been successfully removed from liked songs` });
        } else {
            return res.status(200).json({ message: `Track has been successfully removed from playlist ${playlistId}` });
        }

    } catch(e) {
        next(e)
    }
}
