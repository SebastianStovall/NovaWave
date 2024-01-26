"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendedAlbums = exports.getTwoRandomArtists = exports.getThreeRandomAlbums = exports.getUserLikedSongsPlaylist = void 0;
const User_1 = require("../models/User");
const Album_1 = require("../models/Album");
const Artist_1 = require("../models/Artist");
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const getUserLikedSongsPlaylist = async (userId) => {
    try {
        const user = await User_1.UserModel.findById({ _id: userId }).populate({ path: 'likedSongsPlaylistId' });
        if (!user) {
            throw new CustomError_1.default("Query Error", "Error While Fetching User Liked Songs", 500);
        }
        return { _id: user.likedSongsPlaylistId._id }; // only include necessary fields
    }
    catch (e) {
        throw e;
    }
};
exports.getUserLikedSongsPlaylist = getUserLikedSongsPlaylist;
const getThreeRandomAlbums = async () => {
    try {
        // Use the aggregate method to perform a random sampling
        const randomAlbums = await Album_1.AlbumModel.aggregate([
            { $sample: { size: 3 } }, {
                $project: {
                    image: 1,
                    title: 1,
                },
            },
        ]);
        console.log("RANDOM ALBUMS");
        return randomAlbums;
    }
    catch (e) {
        console.log("ERROR", e);
        throw new CustomError_1.default("Query Error", "Error While Fetching Random Albums", 500);
    }
};
exports.getThreeRandomAlbums = getThreeRandomAlbums;
const getTwoRandomArtists = async () => {
    try {
        // Use the aggregate method to perform a random sampling
        const randomArtists = await Artist_1.ArtistModel.aggregate([
            { $sample: { size: 2 } }, {
                $project: {
                    name: 1,
                    aboutImage: 1,
                },
            },
        ]);
        return randomArtists;
    }
    catch (e) {
        throw new CustomError_1.default("Query Error", "Error While Fetching Random Artists", 500);
    }
};
exports.getTwoRandomArtists = getTwoRandomArtists;
const getRecommendedAlbums = async () => {
    try {
        const last9Documents = await Album_1.AlbumModel.find()
            .sort({ createdAt: -1 }) // Sort in descending order based on createdAt
            .limit(9); // Limit the result to 9 documents
        return last9Documents;
    }
    catch (e) {
        throw new CustomError_1.default("Query Error", "Error While Fetching Recommended Albums", 500);
    }
};
exports.getRecommendedAlbums = getRecommendedAlbums;
