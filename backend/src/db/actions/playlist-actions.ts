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


export const addTrack = async (trackId: string, playlistId: string) => {
    try {
        await PlaylistModel.updateOne(
            { _id: playlistId, 'tracks.track': { $ne: trackId } }, // specify the criteria for the update (only update if trackId not in array) -- 0(log n) -- cannot use $addToSet due to having addedAt field
            {
                $push: {
                    tracks: { track: trackId, addedAt: new Date() }
                }
            }
        )
    } catch (e: any) {
        throw e
    }
};
