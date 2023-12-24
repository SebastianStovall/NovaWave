import { RequestHandler } from "express";
import { initNewPlaylist, getPlaylistsByUserId, addTrack, deleteTrack } from "../db/actions/playlist-actions";
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
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field

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

        const trackAdded = await addTrack(trackId, playlistId, currentUserId)

        if (trackAdded) {
            res.status(201).json({ message: `Track added to playlist` });
        } else {
            res.status(200).json({ message: `Track already in playlist` });
        }

    } catch(e) {
        next(e)
    }
}


export const deleteTrackFromPlaylist: RequestHandler = async (req, res, next) => {
    try {
        const { trackId, playlistId } = req.body
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field

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

        await deleteTrack(trackId, playlistId, currentUserId)
        res.status(200).json({ message: `If track present in playlist, It has been successfully deleted` });

    } catch(e) {
        next(e)
    }
}


export const addTrackToLikedSongs: RequestHandler = async(req, res, next) => {
    try {
        const { trackId } = req.body
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field
        const userLikedSongsPlaylistId = get(req, "identity.likedSongsPlaylistId") as unknown as string; // key into identify and grab ._id field

        if(!trackId) {
            throw new CustomError(
                "MissingTrackId",
                "Track ID is missing in the request body",
                400
            );
        }

        const trackAdded = await addTrack(trackId, userLikedSongsPlaylistId, currentUserId)
        if (trackAdded) {
            res.status(201).json({ message: `Track added to Liked Songs` });
        } else {
            res.status(200).json({ message: `Track already in Liked Songs` });
        }

    } catch(e) {
        next(e)
    }
}


export const removeTrackFromLikedSongs: RequestHandler = async(req, res, next) => {
    try {
        const { trackId } = req.body
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field
        const userLikedSongsPlaylistId = get(req, "identity.likedSongsPlaylistId") as unknown as string; // key into identify and grab ._id field

        if(!trackId) {
            throw new CustomError(
                "MissingTrackId",
                "Track ID is missing in the request body",
                400
            );
        }

        await deleteTrack(trackId, userLikedSongsPlaylistId, currentUserId)
        res.status(200).json({ message: `Track removed from Liked Songs` });
    } catch(e) {
        next(e)
    }
}



// TODO

// foo playlist ID--> 6587e6e9fd199b61ec623b12

// 3. addPlaylistToUserLibrary(plOwnerId)            (user 0(1) -- querying for adding to collection 0(1) -- connection to db = required )      user.playlistsArray($push)
// 4. removePlaylistFromUserLibrary(plOwnerId)       (user 0(1) -- querying for removing from collection 0(1) -- connection to db = required )  user.playlistsArray($pull)


// 5. addAlbumToPlaylist        same setup as addTrackToPlaylist
// 6. removeAlbumFromPlaylist   same setup as removeTrackFromPlaylist
