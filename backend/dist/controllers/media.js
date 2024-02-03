"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurrentMedia = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const media_actions_1 = require("../db/actions/media-actions");
const updateCurrentMedia = async (req, res, next) => {
    try {
        const { mediaInformation } = req.body;
        if (!mediaInformation) {
            throw new CustomError_1.default("Bad Request", "Entity information is missing in the request body", 400);
        }
        if (mediaInformation.mediaType !== 'artist' && mediaInformation.mediaType !== 'album' && mediaInformation.mediaType !== 'playlist') {
            throw new CustomError_1.default("Bad Request", `Media type ${mediaInformation.mediaType} is invalid`, 400);
        }
        const mediaInfo = await (0, media_actions_1.getMediaInfo)(mediaInformation.mediaId, mediaInformation.mediaType);
        return res.status(200).json({ message: `Successfully Retreived ${mediaInformation.mediaType} info from backend database`, media: mediaInfo });
    }
    catch (e) {
        next(e);
    }
};
exports.updateCurrentMedia = updateCurrentMedia;
