"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscography = exports.getTopSongs = exports.getMediaInfo = void 0;
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const Artist_1 = require("../models/Artist");
const Album_1 = require("../models/Album");
const Track_1 = require("../models/Track");
const Playlist_1 = require("../models/Playlist");
const getMediaInfo = async (entityId, entityType) => {
    try {
        if (entityType === 'album') {
            const album = await Album_1.AlbumModel.findById(entityId);
            if (!album) {
                throw new CustomError_1.default("Query Error", `${entityType} document could not be found`, 500);
            }
            return await album.populate({ path: 'tracks' });
        }
        else if (entityType === 'artist') {
            const artist = await Artist_1.ArtistModel.findById(entityId);
            if (!artist) {
                throw new CustomError_1.default("Query Error", `${entityType} document could not be found`, 500);
            }
            return artist;
        }
        else if (entityType === 'playlist') {
            const playlist = await Playlist_1.PlaylistModel.findById(entityId);
            if (!playlist) {
                throw new CustomError_1.default("Query Error", `${entityType} document could not be found`, 500);
            }
            return await playlist.populate({ path: 'tracks' });
        }
        else {
            throw new CustomError_1.default("Bad Request", `Entity type ${entityType} is invalid`, 500);
        }
    }
    catch (e) {
        throw e;
    }
};
exports.getMediaInfo = getMediaInfo;
const getTopSongs = async (artistId) => {
    try {
        const artist = await Artist_1.ArtistModel.findById(artistId);
        if (!artist) {
            throw new CustomError_1.default("Query Error", `${artistId} document could not be found`, 500);
        }
        const topSongs = await Track_1.TrackModel
            .find({ artist: artistId }) // Filter tracks by artistId
            .sort({ plays: -1 }) // Sort in descending order based on plays
            .limit(5); // Limit to top 5 tracks
        return topSongs;
    }
    catch (e) {
        throw e;
    }
};
exports.getTopSongs = getTopSongs;
const getDiscography = async (artistId) => {
    try {
        const artist = await Artist_1.ArtistModel.findById(artistId);
        if (!artist) {
            throw new CustomError_1.default("Query Error", `${artistId} document could not be found`, 500);
        }
        const discography = await Album_1.AlbumModel.find({ artist: artistId });
        return discography;
    }
    catch (e) {
        throw e;
    }
};
exports.getDiscography = getDiscography;
