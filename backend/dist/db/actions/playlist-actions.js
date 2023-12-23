"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initNewPlaylist = void 0;
const Playlist_1 = require("../models/Playlist");
const User_1 = require("../models/User");
// initializes a new empty playlist for particular user
const initNewPlaylist = async (userId, count) => {
    const playlistDefaultValues = {
        owners: [userId],
        title: `My Playlist ${count + 1}`,
        desc: '',
        tracks: [],
        numSongs: 0,
        length: '0:00'
    };
    try {
        const playlist = await new Playlist_1.PlaylistModel(playlistDefaultValues).save();
        await User_1.UserModel.updateOne({ _id: userId }, { $push: { playlists: playlist._id } }); // add the playlist to the user's document
        return playlist.toObject();
    }
    catch (e) {
        console.error('Error creating playlist:', e.message);
        return null;
    }
};
exports.initNewPlaylist = initNewPlaylist;
