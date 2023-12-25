import { PlaylistModel } from "../models/Playlist";
import { UserModel } from "../models/User";
import { getUserById } from "./user-actions";
import CustomError from "../../utils/CustomError";

// initializes a new empty playlist for particular user
export const initNewPlaylist = async (userId: string, count: number) => {
    try {
        const playlistDefaultValues = {
            owner: userId,
            title: `My Playlist ${count + 1}`,
        };

        const playlist = await new PlaylistModel(playlistDefaultValues).save();
        await UserModel.updateOne({ _id: userId }, { $push: { playlists: playlist._id } }); // add the playlist to the user's document
    } catch (e: any) {
        throw e;
    }
}


export const getPlaylistsByUserId = async (userId: string) => {
    try {
        const user = await getUserById(userId)
        if(user) {
            await user.populate(['playlists'])
            return user.playlists
        }

    } catch(e: any) {
        throw(e)
    }
}


export const addTrack = async (trackId: string, playlistId: string, userId: string) => {
    try {
        const isOwner = await PlaylistModel.findOne({ _id: playlistId, owner: userId })

        if(!isOwner) {
            throw new CustomError(
                "InvalidOwner",
                "User does not have the permission to modify this playlist",
                403
            )
        }


        const result = await PlaylistModel.updateOne(
            { _id: playlistId, 'tracks.track': { $ne: trackId } }, // specify the criteria for the update --> (only update if trackId not in array && owner of playlist = user) -- 0(log n) -- cannot use $addToSet due to having addedAt field
            {
                $push: {
                    tracks: { track: trackId, addedAt: new Date() }
                }
            }
        )

        return result.modifiedCount > 0 // determine if track was added or not

    } catch (e: any) {
        if(e instanceof CustomError) {
            throw e
        } else {
            throw new CustomError(
                "InvalidObjectId",
                'Provided trackId or playlistId is an invalid objectId. Update Operation unsuccessful',
                400
            )
        }
    }
};


export const removeTrack = async(trackId: string, playlistId: string, userId: string) => {
    try {
        const result = await PlaylistModel.updateOne({_id: playlistId, owner: userId}, { $pull: { tracks: {track: trackId} } } )
        if(result.matchedCount === 0) { // match count is based off first arg of updateOne (if conditions match = 1, else 0), if no match, playlist ownerId !== userId
            throw new CustomError(
                "InvalidOwnerId",
                `User is not the owner of this playlist. Delete operation unsuccessful`,
                403
            );
        }
    } catch(e: any) {
        if(e instanceof CustomError) {
            throw e
        } else {
            throw new CustomError( // query failed when trying to remove a malformed trackId
                "InvalidObjectId",
                'Provided trackId or playlistId is an invalid objectId. Delete Operation unsuccessful',
                400
            )
        }
    }
}


export const addToLibrary = async(playlistId: string, userId: string) => {
    try {
        await UserModel.updateOne({_id: userId}, {$addToSet: {playlists: playlistId}}) // will only add to array if playlistObjectId was not already in user library

    } catch(e) {
        throw new CustomError(
            "Bad Request",
            'The requested playlist cannot be added to library because it does not exist',
            400
        )
    }
}


export const removeFromLibrary = async(playlistId: string, userId: string) => {
    try {
        const result = await UserModel.updateOne({_id: userId}, {$pull: {playlists: playlistId}})
        console.log("RESULT", result)
    } catch(e) {
        throw e
    }
}


// TODO --- DELETE PLAYLIST ROUTE (can only delete if the playlist ownerId = userId)
