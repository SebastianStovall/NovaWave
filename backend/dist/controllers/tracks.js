"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArtists = exports.getAllAlbums = exports.getAllPlaylists = exports.getAllTracks = void 0;
const track_actions_1 = require("../db/actions/track-actions");
const getAllTracks = async (req, res, next) => {
    try {
        const tracks = await (0, track_actions_1.getTracks)();
        return res.status(200).json(tracks);
    }
    catch (e) {
        next(e);
    }
};
exports.getAllTracks = getAllTracks;
const getAllPlaylists = async (req, res, next) => {
    try {
        const playlists = await (0, track_actions_1.getPlaylists)();
        return res.status(200).json(playlists);
    }
    catch (e) {
        next(e);
    }
};
exports.getAllPlaylists = getAllPlaylists;
const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await (0, track_actions_1.getAlbums)();
        return res.status(200).json(albums);
    }
    catch (e) {
        next(e);
    }
};
exports.getAllAlbums = getAllAlbums;
const getAllArtists = async (req, res, next) => {
    try {
        const artists = await (0, track_actions_1.getArtists)();
        return res.status(200).json(artists);
    }
    catch (e) {
        next(e);
    }
};
exports.getAllArtists = getAllArtists;
