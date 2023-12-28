"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTrackFromPlaylist = exports.addTrackToPlaylist = exports.createNewPlaylist = exports.getUserPlaylists = void 0;
const playlist_actions_1 = require("../db/actions/playlist-actions");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const lodash_1 = require("lodash");
const getUserPlaylists = async (req, res, next) => {
    try {
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        const userPlaylists = await (0, playlist_actions_1.getPlaylistsByUserId)(currentUserId);
        res.status(200).json(userPlaylists);
    }
    catch (e) {
        next(e);
    }
};
exports.getUserPlaylists = getUserPlaylists;
const createNewPlaylist = async (req, res, next) => {
    try {
        const userId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        const username = (0, lodash_1.get)(req, "identity.username");
        const userPlaylists = (0, lodash_1.get)(req, "identity.playlists"); // key into identify and grab ._id field
        await (0, playlist_actions_1.initNewPlaylist)(userId, userPlaylists.length, username);
        res.status(201).json({ message: 'Successfully Created Playlist' });
    }
    catch (e) {
        next(e);
    }
};
exports.createNewPlaylist = createNewPlaylist;
// handles adding tracks to regular playlists AND liked songs playlists
const addTrackToPlaylist = async (req, res, next) => {
    try {
        const { trackId, playlistId } = req.body;
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        const userLikedSongsPlaylistId = (0, lodash_1.get)(req, "identity.likedSongsPlaylistId"); // key into identify and grab ._id field
        if (!trackId || !playlistId) {
            throw new CustomError_1.default("Bad Request", "Track ID or Playlist ID is missing in the request body", 400);
        }
        const trackAdded = await (0, playlist_actions_1.addTrack)(trackId, playlistId, currentUserId);
        if (playlistId === userLikedSongsPlaylistId.toString()) {
            if (trackAdded) {
                return res.status(201).json({ message: `Track added to Liked Songs playlist` });
            }
            else {
                return res.status(200).json({ message: `Track already in liked songs` });
            }
        }
        else {
            if (trackAdded) {
                return res.status(201).json({ message: `Track added to playlist ${playlistId}` });
            }
            else {
                return res.status(200).json({ message: `Track already in playlist` });
            }
        }
    }
    catch (e) {
        next(e);
    }
};
exports.addTrackToPlaylist = addTrackToPlaylist;
const removeTrackFromPlaylist = async (req, res, next) => {
    try {
        const { trackId, playlistId } = req.body;
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        const userLikedSongsPlaylistId = (0, lodash_1.get)(req, "identity.likedSongsPlaylistId"); // key into identify and grab ._id field
        if (!trackId || !playlistId) {
            throw new CustomError_1.default("Bad request", "Track ID or Playlist Id is missing in the request body", 400);
        }
        await (0, playlist_actions_1.removeTrack)(trackId, playlistId, currentUserId);
        if (playlistId === userLikedSongsPlaylistId.toString()) {
            return res.status(200).json({ message: `Track has been successfully removed from liked songs` });
        }
        else {
            return res.status(200).json({ message: `Track has been successfully removed from playlist ${playlistId}` });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.removeTrackFromPlaylist = removeTrackFromPlaylist;
