"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtistInformation = exports.getArtistTopSongs = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const artist_actions_1 = require("../db/actions/artist-actions");
const getArtistTopSongs = async (req, res, next) => {
    try {
        const { artistId } = req.body;
        if (!artistId) {
            throw new CustomError_1.default("Bad Request", "Entity information is missing in the request body", 400);
        }
        const songs = await (0, artist_actions_1.getTopSongs)(artistId);
        return res.status(200).json({ message: `Successfully Retreived Top Songs for artist`, songs: songs });
    }
    catch (e) {
        next(e);
    }
};
exports.getArtistTopSongs = getArtistTopSongs;
const getArtistInformation = async (req, res, next) => {
    try {
        const { artistId } = req.body;
        if (!artistId) {
            throw new CustomError_1.default("Bad Request", "Entity information is missing in the request body", 400);
        }
        const artist = await (0, artist_actions_1.getArtistInfo)(artistId);
        return res.status(200).json({ message: `Successfully Retreived artist information`, artist: artist });
    }
    catch (e) {
        next(e);
    }
};
exports.getArtistInformation = getArtistInformation;
