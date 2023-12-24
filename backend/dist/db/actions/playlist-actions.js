"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTrack = exports.getPlaylistsByUserId = exports.initNewPlaylist = void 0;
const Playlist_1 = require("../models/Playlist");
const User_1 = require("../models/User");
const user_actions_1 = require("./user-actions");
// initializes a new empty playlist for particular user
const initNewPlaylist = async (userId, count) => {
    try {
        const playlistDefaultValues = {
            owner: userId,
            title: `My Playlist ${count + 1}`,
        };
        const playlist = await new Playlist_1.PlaylistModel(playlistDefaultValues).save();
        await User_1.UserModel.updateOne({ _id: userId }, { $push: { playlists: playlist._id } }); // add the playlist to the user's document
    }
    catch (e) {
        throw e;
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
        throw (e);
    }
};
exports.getPlaylistsByUserId = getPlaylistsByUserId;
const addTrack = async (trackId, playlistId) => {
    try {
        await Playlist_1.PlaylistModel.updateOne({ _id: playlistId, 'tracks.track': { $ne: trackId } }, // specify the criteria for the update (only update if trackId not in array) -- 0(log n) -- cannot use $addToSet due to having addedAt field
        {
            $push: {
                tracks: { track: trackId, addedAt: new Date() }
            }
        });
    }
    catch (e) {
        throw e;
    }
};
exports.addTrack = addTrack;
