"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtistInfo = exports.getTopSongs = exports.addArtistToRecents = void 0;
const User_1 = require("../models/User");
const Artist_1 = require("../models/Artist");
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const Track_1 = require("../models/Track");
const addArtistToRecents = async (userId, artistId) => {
    try {
        const artist = await Artist_1.ArtistModel.findById(artistId);
        if (!artist) {
            throw new CustomError_1.default("Query Error", "Error While Fetching Artist Document", 500);
        }
        await User_1.UserModel.findByIdAndUpdate(userId, { $push: { recentlyViewed: artistId } });
    }
    catch (e) {
        throw e;
    }
};
exports.addArtistToRecents = addArtistToRecents;
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
const getArtistInfo = async (artistId) => {
    try {
        const artist = await Artist_1.ArtistModel.findById(artistId).populate('discography');
        if (!artist) {
            throw new CustomError_1.default("Query Error", `${artistId} document could not be found`, 500);
        }
        return artist;
    }
    catch (e) {
        throw e;
    }
};
exports.getArtistInfo = getArtistInfo;
