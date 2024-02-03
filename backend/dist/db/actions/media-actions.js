"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaInfo = void 0;
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const Artist_1 = require("../models/Artist");
const Album_1 = require("../models/Album");
const Playlist_1 = require("../models/Playlist");
const getMediaInfo = async (entityId, entityType) => {
    try {
        if (entityType === 'album') {
            const album = await Album_1.AlbumModel.findById(entityId);
            if (!album) {
                throw new CustomError_1.default("Query Error", `${entityType} document could not be found`, 500);
            }
            return album;
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
            return playlist;
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
