"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEntityFromLibrary = exports.addEntityToLibrary = void 0;
const playlist_actions_1 = require("../db/actions/playlist-actions");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const lodash_1 = require("lodash");
// Adds a playlist or album to a user's library
const addEntityToLibrary = async (req, res, next) => {
    try {
        const { entityId, entityType, entityOwnerId } = req.body; // entityOwnerId is for playlists only
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        if (!entityId || !entityType) {
            throw new CustomError_1.default("Bad Request", "Entity information is missing in the request body", 400);
        }
        if (entityType === 'playlist' && entityOwnerId && entityOwnerId === currentUserId.toString()) { // WHEN TESTING IN FRONTEND, MAKE SURE THESE ARE BEING COMPARED THE SAME WAY (string === string NOT objectId(string) === string)
            return res.status(200).json({ message: `This playlist is already in your Library` });
        }
        await (0, playlist_actions_1.addToLibrary)(entityId, entityType, currentUserId);
        return res.status(200).json({ message: `Successfully Added ${entityType} to User Library` });
    }
    catch (e) {
        next(e);
    }
};
exports.addEntityToLibrary = addEntityToLibrary;
// Removes a playlist or album to a user's library
const removeEntityFromLibrary = async (req, res, next) => {
    try {
        const { entityId, entityType } = req.body;
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        const userLikedSongsPlaylistId = (0, lodash_1.get)(req, "identity.likedSongsPlaylistId");
        if (!entityId || !entityType) {
            throw new CustomError_1.default("Bad Request", "Entity information is missing in the request body", 400);
        }
        if (entityType !== 'playlist' && entityType !== 'album') {
            throw new CustomError_1.default("Bad Request", "Entity type may only be 'playlist or 'album'", 400);
        }
        if (entityId === userLikedSongsPlaylistId.toString()) { // might need to change when testing on frontend...
            throw new CustomError_1.default("Forbidden", "Cannot delete Liked Songs playlist. Each user must have one", 403);
        }
        await (0, playlist_actions_1.removeFromLibrary)(entityId, entityType, currentUserId);
        return res.status(200).json({ message: `Successfully Removed ${entityType} from User Library` });
    }
    catch (e) {
        next(e);
    }
};
exports.removeEntityFromLibrary = removeEntityFromLibrary;
