"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrack = exports.getMediaInfo = void 0;
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const Artist_1 = require("../models/Artist");
const Album_1 = require("../models/Album");
const Track_1 = require("../models/Track");
const Playlist_1 = require("../models/Playlist");
const getMediaInfo = async (entityId, entityType) => {
    var _a;
    try {
        if (entityType === 'album') {
            const album = await Album_1.AlbumModel.findById(entityId);
            if (!album) {
                throw new CustomError_1.default("Query Error", `${entityType} document could not be found`, 500);
            }
            const artistImg = (_a = (await Artist_1.ArtistModel.findById(album.artist))) === null || _a === void 0 ? void 0 : _a.aboutImage;
            return [await album.populate({ path: 'tracks' }), artistImg];
        }
        else if (entityType === 'artist') {
            const artist = await Artist_1.ArtistModel.findById(entityId);
            if (!artist) {
                throw new CustomError_1.default("Query Error", `${entityType} document could not be found`, 500);
            }
            return [artist, null];
        }
        else if (entityType === 'playlist') {
            const playlist = await Playlist_1.PlaylistModel.findById(entityId).populate('tracks.track');
            if (!playlist) {
                throw new CustomError_1.default("Query Error", `${entityType} document could not be found`, 500);
            }
            return [playlist, null];
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
const getTrack = async () => {
    try {
        const track = await Track_1.TrackModel.findOne({ title: 'KILLKA' });
        return track;
    }
    catch (e) {
        throw e;
    }
};
exports.getTrack = getTrack;
