import { PlaylistModel } from "../models/Playlist";
import { UserModel } from "../models/User";
import { getUserById } from "./user-actions";
import CustomError from "../../utils/CustomError";

// initializes a new empty playlist for particular user
export const initNewPlaylist = async (userId: string, count: number, username: string) => {
    try {
        const playlistDefaultValues = {
            owner: userId,
            title: `${username} playlist ${count + 1}`,
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
        const isOwner = await PlaylistModel.findOne({ _id: playlistId, owner: userId }) // another query is needed here due to $ne criterion in updateOne

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
                "InvalidOwner",
                `User does not have the permission to modify this playlist`,
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


export const addToLibrary = async(entityId: string, entityType: string, userId: string, entityOwnerId: string | undefined) => {

    if(entityType === 'playlist') { // ensure a valid owner exists for the playlist you are trying to add
        try {
            await UserModel.findById(entityOwnerId)
        } catch(e) {
            throw new CustomError(
                "Bad Request",
                `The playlist that you are attempting has an invalid ownerId`,
                400
            );
        }
    }

    try {
        const updateKey = entityType === 'playlist' ? 'playlists' : entityType === 'album' ? 'albums' : 'artists'
        await UserModel.updateOne({_id: userId}, {$addToSet: {[updateKey]: entityId}}) // $addToSet will only add to array if playlistObjectId was not already in user library

    } catch(e) {
        throw new CustomError(
            "Bad Request",
            `The requested ${entityType} cannot be added to the library because it does not exist. Ensure its ObjectId is correct`,
            400
        )
    }
}


export const removeFromLibrary = async(entityId: string, entityType: string, userId: string) => {

    try {
        const updateKey = entityType === 'playlist' ? 'playlists' : entityType === 'album' ? 'albums' : 'artists'
        await UserModel.updateOne({_id: userId}, {$pull: {[updateKey]: entityId}})

        // If you own this playlist, set private = true (prevents lookup of this playlist in the future, and user's will still be able to use this playlist until they remove it)
        if(entityType === 'playlist') {
            const playlist = await PlaylistModel.findById(entityId)
            if( playlist && playlist.owner && playlist.owner.toString() === userId.toString() ) {
                playlist.isPrivate = true
                await playlist.save()
            }
        }


    } catch(e) {
        throw new CustomError(
            "Bad Request",
            `The requested ${entityType} cannot be removed from the library because it does not exist. Ensure its ObjectId is correct`,
            400
        );
    }
}


// TODO --- DELETE PLAYLIST ROUTE (can only delete if the playlist ownerId = userId)
