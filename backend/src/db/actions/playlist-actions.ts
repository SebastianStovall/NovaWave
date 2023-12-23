import { PlaylistModel } from "../models/Playlist";
import { UserModel } from "../models/User";

// initializes a new empty playlist for particular user
export const initNewPlaylist = async (userId: string, count: number): Promise<object | null> => {
    const playlistDefaultValues = {
        owners: [userId],
        title: `My Playlist ${count + 1}`,
        desc: '',
        tracks: [],
        numSongs: 0,
        length: '0:00'
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
