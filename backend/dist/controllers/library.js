"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePlaylistFromLibrary = exports.addPlaylistToLibrary = void 0;
const playlist_actions_1 = require("../db/actions/playlist-actions");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const lodash_1 = require("lodash");
// * These controller functions handle adding/removing playlists and albums to user's library
const addPlaylistToLibrary = async (req, res, next) => {
    try {
        const { playlistOwnerId, playlistId } = req.body;
        const currentUserId = (0, lodash_1.get)(req, "identity._id").toString(); // key into identify and grab ._id field
        if (!playlistOwnerId || !playlistId) {
            throw new CustomError_1.default("Bad Request", "playlist information is missing in the request body", 400);
        }
        if (playlistOwnerId === currentUserId) { // WHEN TESTING IN FRONTEND, MAKE SURE THESE ARE BEING COMPARED THE SAME WAY (string === string NOT objectId(string) === string)
            return res.status(200).json({ message: 'This playlist is already in your Library' });
        }
        await (0, playlist_actions_1.addToLibrary)(playlistId, currentUserId);
        return res.status(200).json({ message: 'Successfully Added Playlist to User Library' });
    }
    catch (e) {
        next(e);
    }
};
exports.addPlaylistToLibrary = addPlaylistToLibrary;
const removePlaylistFromLibrary = async (req, res, next) => {
    try {
        const { playlistId } = req.body;
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        const userLikedSongsPlaylistId = (0, lodash_1.get)(req, "identity.likedSongsPlaylistId");
        if (!playlistId) {
            throw new CustomError_1.default("Bad Request", "playlist information is missing in the request body", 400);
        }
        if (playlistId === userLikedSongsPlaylistId.toString()) { // might need to change when testing on frontend...
            throw new CustomError_1.default("Forbidden", "Cannot delete Liked Songs playlist. Each user must have one", 403);
        }
        await (0, playlist_actions_1.removeFromLibrary)(playlistId, currentUserId);
        return res.status(200).json({ message: 'Successfully Removed Playlist from User Library' });
    }
    catch (e) {
        next(e);
    }
};
exports.removePlaylistFromLibrary = removePlaylistFromLibrary;
