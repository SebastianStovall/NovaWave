"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.grabDummyTrack = exports.updateCurrentMedia = void 0;
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
        const [mediaInfo, artistImg] = await (0, media_actions_1.getMediaInfo)(mediaId, mediaType);
        return res.status(200).json({ message: `Successfully Retreived ${mediaType} info from backend database`, media: mediaInfo, type: mediaType, artistImg: artistImg });
    }
    catch (e) {
        next(e);
    }
};
exports.updateCurrentMedia = updateCurrentMedia;
const grabDummyTrack = async (req, res, next) => {
    try {
        const dummyTrack = await (0, media_actions_1.getTrack)();
        return res.status(200).json({ message: `Successfully Retreived dummy track`, track: dummyTrack });
    }
    catch (e) {
        next(e);
    }
};
exports.grabDummyTrack = grabDummyTrack;
