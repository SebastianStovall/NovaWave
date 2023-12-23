"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewPlaylist = void 0;
const playlist_actions_1 = require("../db/actions/playlist-actions");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const lodash_1 = require("lodash");
const createNewPlaylist = async (req, res) => {
    try {
        const userId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        const userPlaylists = (0, lodash_1.get)(req, "identity.playlists"); // key into identify and grab ._id field
        const playlist = await (0, playlist_actions_1.initNewPlaylist)(userId, userPlaylists.length);
        if (!playlist) {
            throw new CustomError_1.default("CreationError", "Error while creating new playlist", 500);
        }
        res.status(201).json({ message: 'Successfully Created Playlist' });
    }
    catch (e) {
        if (e instanceof CustomError_1.default) {
            res.status(e.code).json({ message: e.name, error: e.message });
        }
        else {
            res.status(500).json({ message: "Internal Server Error", error: e.message });
        }
    }
};
exports.createNewPlaylist = createNewPlaylist;
