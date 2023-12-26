"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtists = exports.getAlbums = exports.getPlaylists = exports.getTracks = void 0;
const Album_1 = require("../models/Album");
const Artist_1 = require("../models/Artist");
const Playlist_1 = require("../models/Playlist");
const Track_1 = require("../models/Track");
const getTracks = async () => {
    try {
        const tracks = await Track_1.TrackModel.find();
        return tracks;
    }
    catch (e) {
        throw e;
    }
};
exports.getTracks = getTracks;
const getPlaylists = async () => {
    try {
        const playlists = await Playlist_1.PlaylistModel.find();
        return playlists;
    }
    catch (e) {
        throw e;
    }
};
exports.getPlaylists = getPlaylists;
const getAlbums = async () => {
    try {
        const albums = await Album_1.AlbumModel.find();
        return albums;
    }
    catch (e) {
        throw e;
    }
};
exports.getAlbums = getAlbums;
const getArtists = async () => {
    try {
        const artists = await Artist_1.ArtistModel.find();
        return artists;
    }
    catch (e) {
        throw e;
    }
};
exports.getArtists = getArtists;
