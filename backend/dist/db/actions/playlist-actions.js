"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylistsByUserId = exports.initNewPlaylist = void 0;
const Playlist_1 = require("../models/Playlist");
const User_1 = require("../models/User");
const user_actions_1 = require("./user-actions");
// initializes a new empty playlist for particular user
const initNewPlaylist = async (userId, count) => {
    const playlistDefaultValues = {
        owner: userId,
        title: `My Playlist ${count + 1}`,
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
const getPlaylistsByUserId = async (userId) => {
    try {
        const user = await (0, user_actions_1.getUserById)(userId);
        if (user) {
            await user.populate(['playlists']);
            return user.playlists;
        }
    }
    catch (e) {
        console.error(e);
        return null;
    }
};
exports.getPlaylistsByUserId = getPlaylistsByUserId;
