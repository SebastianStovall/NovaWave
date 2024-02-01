"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntityToRecents = exports.getQuickplayDocuments = exports.getTwoRandomArtists = exports.getRandomAlbums = exports.getUserLikedSongsPlaylist = void 0;
const User_1 = require("../models/User");
const Album_1 = require("../models/Album");
const Artist_1 = require("../models/Artist");
const Playlist_1 = require("../models/Playlist");
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const user_actions_1 = require("./user-actions");
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
const getRandomAlbums = async () => {
    try {
        // Use the aggregate method to perform a random sampling
        const randomAlbums = await Album_1.AlbumModel.aggregate([
            { $sample: { size: 9 } }, {
                $project: {
                    _id: 1
                },
            },
        ]);
        return randomAlbums.map((objectId) => objectId._id);
    }
    catch (e) {
        console.log("ERROR", e);
        throw new CustomError_1.default("Query Error", "Error While Fetching Random Albums", 500);
    }
};
exports.getRandomAlbums = getRandomAlbums;
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
const getQuickplayDocuments = async (userId) => {
    try {
        const userDocument = await (0, user_actions_1.getUserById)(userId);
        if (!userDocument) {
            throw new CustomError_1.default("Query Error", "User Document was not found with the provided ObjectId", 500);
        }
        // One spot will always be liked songs in quickplay grid, so only 5 documents are needed
        if (userDocument.recentlyViewed.length < 5) { // if less than 5 items in recentlyViewed populate it
            const nineRandomAlbums = await (0, exports.getRandomAlbums)();
            userDocument.recentlyViewed = userDocument.recentlyViewed.concat(nineRandomAlbums);
            await userDocument.save();
            return userDocument.recentlyViewed;
        }
        else {
            const populated = await userDocument.populate('recentlyViewed');
            console.log("POP? --> ", populated);
            return userDocument.recentlyViewed;
        }
    }
    catch (e) {
        throw new CustomError_1.default("Query Error", "Error While Fetching User Document", 500);
    }
};
exports.getQuickplayDocuments = getQuickplayDocuments;
const addEntityToRecents = async (userId, entityId, entityType) => {
    try {
        if (entityType === 'album') {
            const album = await Album_1.AlbumModel.findById(entityId);
            if (!album) {
                throw new CustomError_1.default("Query Error", `${entityType} document could not be found`, 500);
            }
        }
        else if (entityType === 'artist') {
            const artist = await Artist_1.ArtistModel.findById(entityId);
            if (!artist) {
                throw new CustomError_1.default("Query Error", `${entityType} document could not be found`, 500);
            }
        }
        else if (entityType === 'playlist') {
            const playlist = await Playlist_1.PlaylistModel.findById(entityId);
            if (!playlist) {
                throw new CustomError_1.default("Query Error", `${entityType} document could not be found`, 500);
            }
        }
        else {
            throw new CustomError_1.default("Bad Request", `Entity type ${entityType} is invalid`, 500);
        }
        await User_1.UserModel.findByIdAndUpdate(userId, { $push: { recentlyViewed: entityId } });
    }
    catch (e) {
        throw e;
    }
};
exports.addEntityToRecents = addEntityToRecents;
