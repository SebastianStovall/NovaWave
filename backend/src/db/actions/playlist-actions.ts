import { PlaylistModel } from "../models/Playlist";
import { UserModel } from "../models/User";
import { getUserById } from "./user-actions";

// initializes a new empty playlist for particular user
export const initNewPlaylist = async (userId: string, count: number): Promise<object | null> => {
    const playlistDefaultValues = {
        owner: userId,
        title: `My Playlist ${count + 1}`,
    };

    try {
        const playlist = await new PlaylistModel(playlistDefaultValues).save();
        await UserModel.updateOne({ _id: userId }, { $push: { playlists: playlist._id } }); // add the playlist to the user's document
        return playlist.toObject();
    } catch (e: any) {
        console.error('Error creating playlist:', e.message);
        return null;
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
        console.error(e)
        return null
    }
}
