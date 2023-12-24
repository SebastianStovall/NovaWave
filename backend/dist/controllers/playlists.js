"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrackFromPlaylist = exports.addTrackToPlaylist = exports.createNewPlaylist = exports.getUserPlaylists = void 0;
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
        const userPlaylists = (0, lodash_1.get)(req, "identity.playlists"); // key into identify and grab ._id field
        await (0, playlist_actions_1.initNewPlaylist)(userId, userPlaylists.length);
        res.status(201).json({ message: 'Successfully Created Playlist' });
    }
    catch (e) {
        next(e);
    }
};
exports.createNewPlaylist = createNewPlaylist;
const addTrackToPlaylist = async (req, res, next) => {
    try {
        const { trackId, playlistId } = req.body;
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        if (!trackId) {
            throw new CustomError_1.default("MissingTrackId", "Track ID is missing in the request body", 400);
        }
        if (!playlistId) {
            throw new CustomError_1.default("MissingPlaylistId", "Playlist ID is missing in the request body", 400);
        }
        const trackAdded = await (0, playlist_actions_1.addTrack)(trackId, playlistId, currentUserId);
        if (trackAdded) {
            res.status(201).json({ message: `Track added to playlist` });
        }
        else {
            res.status(200).json({ message: `Track already in playlist` });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.addTrackToPlaylist = addTrackToPlaylist;
const deleteTrackFromPlaylist = async (req, res, next) => {
    try {
        const { trackId, playlistId } = req.body;
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        if (!trackId) {
            throw new CustomError_1.default("MissingTrackId", "Track ID is missing in the request body", 400);
        }
        if (!playlistId) {
            throw new CustomError_1.default("MissingPlaylistId", "Playlist ID is missing in the request body", 400);
        }
        await (0, playlist_actions_1.deleteTrack)(trackId, playlistId, currentUserId);
        res.status(200).json({ message: `If track ${trackId} existed in playlist, it has been successfully deleted` });
    }
    catch (e) {
        next(e);
    }
};
exports.deleteTrackFromPlaylist = deleteTrackFromPlaylist;
// TODO
// foo playlist ID--> 6587e6e9fd199b61ec623b12
// 1. addTrackToLikedSongs              (able to grab likedSongsPlaylistId 0(1) time through req.identity.likedSongsId )
// 2. removeTrackFromLikedSongs         (able to grab likedSongsPlaylistId 0(1) time through req.identity.likedSongsId )
// 3. addPlaylistToUserLibrary(plOwnerId)            (user 0(1) -- querying for adding to collection 0(1) -- connection to db = required )      user.playlistsArray($push)
// 4. removePlaylistFromUserLibrary(plOwnerId)       (user 0(1) -- querying for removing from collection 0(1) -- connection to db = required )  user.playlistsArray($pull)
// 5. addAlbumToPlaylist        same setup as addTrackToPlaylist
// 6. removeAlbumFromPlaylist   same setup as removeTrackFromPlaylist
