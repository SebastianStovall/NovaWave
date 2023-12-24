"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrack = exports.addTrack = exports.getPlaylistsByUserId = exports.initNewPlaylist = void 0;
const Playlist_1 = require("../models/Playlist");
const User_1 = require("../models/User");
const user_actions_1 = require("./user-actions");
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
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
const addTrack = async (trackId, playlistId, userId) => {
    try {
        const isOwner = await Playlist_1.PlaylistModel.findOne({ _id: playlistId, owner: userId });
        if (!isOwner) {
            throw new CustomError_1.default("InvalidOwner", "User does not have the permission to modify this playlist", 403);
        }
        const result = await Playlist_1.PlaylistModel.updateOne({ _id: playlistId, 'tracks.track': { $ne: trackId } }, // specify the criteria for the update --> (only update if trackId not in array && owner of playlist = user) -- 0(log n) -- cannot use $addToSet due to having addedAt field
        {
            $push: {
                tracks: { track: trackId, addedAt: new Date() }
            }
        });
        return result.modifiedCount > 0; // determine if track was added or not
    }
    catch (e) {
        if (e instanceof CustomError_1.default) {
            throw e;
        }
        else {
            throw new CustomError_1.default("InvalidObjectId", 'Provided trackId or playlistId is an invalid objectId. Update Operation unsuccessful', 400);
        }
    }
};
exports.addTrack = addTrack;
const deleteTrack = async (trackId, playlistId, userId) => {
    try {
        const result = await Playlist_1.PlaylistModel.updateOne({ _id: playlistId, owner: userId }, { $pull: { tracks: { track: trackId } } });
        if (result.matchedCount === 0) { // match count is based off first arg of updateOne (if conditions match = 1, else 0), if no match, playlist ownerId !== userId
            throw new CustomError_1.default("InvalidOwnerId", `User with id ${userId} is not the owner of this playlist. Delete operation unsuccessful`, 403);
        }
    }
    catch (e) {
        if (e instanceof CustomError_1.default) {
            throw e;
        }
        else {
            throw new CustomError_1.default(// query failed when trying to remove a malformed trackId
            "InvalidObjectId", 'Provided trackId or playlistId is an invalid objectId. Delete Operation unsuccessful', 400);
        }
    }
};
exports.deleteTrack = deleteTrack;
