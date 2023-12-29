"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromLibrary = exports.addToLibrary = exports.removeTrack = exports.addTrack = exports.getPlaylistsByUserId = exports.initNewPlaylist = void 0;
const Playlist_1 = require("../models/Playlist");
const User_1 = require("../models/User");
const user_actions_1 = require("./user-actions");
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
// initializes a new empty playlist for particular user
const initNewPlaylist = async (userId, count, username) => {
    try {
        const playlistDefaultValues = {
            owner: userId,
            title: `${username} playlist ${count + 1}`,
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
        const isOwner = await Playlist_1.PlaylistModel.findOne({ _id: playlistId, owner: userId }); // another query is needed here due to $ne criterion in updateOne
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
const removeTrack = async (trackId, playlistId, userId) => {
    try {
        const result = await Playlist_1.PlaylistModel.updateOne({ _id: playlistId, owner: userId }, { $pull: { tracks: { track: trackId } } });
        if (result.matchedCount === 0) { // match count is based off first arg of updateOne (if conditions match = 1, else 0), if no match, playlist ownerId !== userId
            throw new CustomError_1.default("InvalidOwner", `User does not have the permission to modify this playlist`, 403);
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
exports.removeTrack = removeTrack;
const addToLibrary = async (entityId, entityType, userId, entityOwnerId) => {
    if (entityType === 'playlist') { // ensure a valid owner exists for the playlist you are trying to add
        try {
            await User_1.UserModel.findById(entityOwnerId);
        }
        catch (e) {
            throw new CustomError_1.default("Bad Request", `The playlist that you are attempting has an invalid ownerId`, 400);
        }
    }
    try {
        const updateKey = entityType === 'playlist' ? 'playlists' : entityType === 'album' ? 'albums' : 'artists';
        await User_1.UserModel.updateOne({ _id: userId }, { $addToSet: { [updateKey]: entityId } }); // $addToSet will only add to array if playlistObjectId was not already in user library
    }
    catch (e) {
        throw new CustomError_1.default("Bad Request", `The requested ${entityType} cannot be added to the library because it does not exist. Ensure its ObjectId is correct`, 400);
    }
};
exports.addToLibrary = addToLibrary;
const removeFromLibrary = async (entityId, entityType, userId) => {
    try {
        const updateKey = entityType === 'playlist' ? 'playlists' : entityType === 'album' ? 'albums' : 'artists';
        await User_1.UserModel.updateOne({ _id: userId }, { $pull: { [updateKey]: entityId } });
        // If you own this playlist, set private = true (prevents lookup of this playlist in the future, and user's will still be able to use this playlist until they remove it)
        if (entityType === 'playlist') {
            const playlist = await Playlist_1.PlaylistModel.findById(entityId);
            if (playlist && playlist.owner && playlist.owner.toString() === userId.toString()) {
                playlist.isPrivate = true;
                await playlist.save();
            }
        }
    }
    catch (e) {
        throw new CustomError_1.default("Bad Request", `The requested ${entityType} cannot be removed from the library because it does not exist. Ensure its ObjectId is correct`, 400);
    }
};
exports.removeFromLibrary = removeFromLibrary;
// TODO --- DELETE PLAYLIST ROUTE (can only delete if the playlist ownerId = userId)
