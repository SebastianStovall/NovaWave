"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtistTopSongs = exports.updateCurrentMedia = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const media_actions_1 = require("../db/actions/media-actions");
const updateCurrentMedia = async (req, res, next) => {
    try {
        const { mediaType, mediaId } = req.body;
        if (!mediaId || !mediaType) {
            throw new CustomError_1.default("Bad Request", "Entity information is missing in the request body", 400);
        }
        if (mediaType !== 'artist' && mediaType !== 'album' && mediaType !== 'playlist') {
            throw new CustomError_1.default("Bad Request", `Media type ${mediaType} is invalid`, 400);
        }
        const mediaInfo = await (0, media_actions_1.getMediaInfo)(mediaId, mediaType);
        return res.status(200).json({ message: `Successfully Retreived ${mediaType} info from backend database`, media: mediaInfo, type: mediaType });
    }
    catch (e) {
        next(e);
    }
};
exports.updateCurrentMedia = updateCurrentMedia;
const getArtistTopSongs = async (req, res, next) => {
    try {
        const { artistId } = req.body;
        if (!artistId) {
            throw new CustomError_1.default("Bad Request", "Entity information is missing in the request body", 400);
        }
        const songs = await (0, media_actions_1.getTopSongs)(artistId);
        return res.status(200).json({ message: `Successfully Retreived Top Songs for artist ${artistId}`, songs: songs });
    }
    catch (e) {
        next(e);
    }
};
exports.getArtistTopSongs = getArtistTopSongs;
