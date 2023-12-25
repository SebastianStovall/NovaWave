import { RequestHandler } from "express";
import { addToLibrary, removeFromLibrary } from "../db/actions/playlist-actions";
import CustomError from "../utils/CustomError";
import { get } from "lodash";


export const addPlaylistToLibrary: RequestHandler = async(req, res, next) => {
    try {
        const { playlistOwnerId, playlistId } = req.body
        const currentUserId = (get(req, "identity._id") as unknown as string).toString(); // key into identify and grab ._id field

        if(!playlistOwnerId || !playlistId) {
            throw new CustomError(
                "Bad Request",
                "playlist information is missing in the request body",
                400
            );
        }

        if(playlistOwnerId === currentUserId) { // WHEN TESTING IN FRONTEND, MAKE SURE THESE ARE BEING COMPARED THE SAME WAY (string === string NOT objectId(string) === string)
            return res.status(200).json({message: 'This playlist is already in your Library'})
        }

        await addToLibrary(playlistId, currentUserId)
        return res.status(200).json({message: 'Successfully Added Playlist to User Library'})

    } catch(e) {
        next(e)
    }
}


export const removePlaylistFromLibrary: RequestHandler = async(req, res, next) => {
    try {
        const { playlistId } = req.body
        const currentUserId = get(req, "identity._id") as unknown as string // key into identify and grab ._id field

        await removeFromLibrary(playlistId, currentUserId)
        return res.status(200).json({message: 'Successfully Removed Playlist from User Library'})

    } catch(e) {
        next(e)
    }
}




// handles favoriting/unfavoriting to "Liked Songs" playlist, and favoriting/unfavoriting other people's playlists to user library


// 3. addPlaylistToLibrary(plOwnerId)            (user 0(1) -- querying for adding to collection 0(1) )      user.playlistsArray($push)  <--- $addToSet ??
// 4. removePlaylistFromLibrary(plOwnerId)       (user 0(1) -- querying for removing from collection 0(n) )  user.playlistsArray($pull)
