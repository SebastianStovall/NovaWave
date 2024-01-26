"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retreiveRecommendedForToday = exports.generateQuickplayGrid = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const lodash_1 = require("lodash");
const dashboard_actions_1 = require("../db/actions/dashboard-actions");
// Generates randomized quickplay grid on user sign in
const generateQuickplayGrid = async (req, res, next) => {
    try {
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        if (!currentUserId) {
            throw new CustomError_1.default("Bad Request", "Entity information is missing (currentUserId)", 400);
        }
        if (!req.body.albums || !req.body.artists) {
            throw new CustomError_1.default("Bad Request", "Entity information is missing (albums and artist info)", 400);
        }
        const albums = req.body.albums.split(',');
        const artists = req.body.artists.split(',');
        let quickplayGrid = [];
        // Populate User Quickplay Grid
        const userLikedSongsPlaylist = await (0, dashboard_actions_1.getUserLikedSongsPlaylist)(currentUserId);
        const randomizedAlbumArray = await (0, dashboard_actions_1.getThreeRandomAlbums)();
        const randomizedArtistArray = await (0, dashboard_actions_1.getTwoRandomArtists)();
        quickplayGrid.push(userLikedSongsPlaylist);
        quickplayGrid = quickplayGrid.concat(randomizedAlbumArray, randomizedArtistArray);
        res.status(200).json({ message: 'Quickplay Grid Successfully Generated for User', quickplayGrid });
    }
    catch (e) {
        next(e);
    }
};
exports.generateQuickplayGrid = generateQuickplayGrid;
const retreiveRecommendedForToday = async (req, res, next) => {
    try {
        const recommendedAlbums = await (0, dashboard_actions_1.getRecommendedAlbums)();
        res.status(200).json({ message: 'Recommended Albums For Today', data: recommendedAlbums });
    }
    catch (e) {
        next(e);
    }
};
exports.retreiveRecommendedForToday = retreiveRecommendedForToday;
