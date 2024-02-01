"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAlbumToRecents = void 0;
const User_1 = require("../models/User");
const Album_1 = require("../models/Album");
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const addAlbumToRecents = async (userId, albumId) => {
    try {
        const album = await Album_1.AlbumModel.findById(albumId);
        if (!album) {
            throw new CustomError_1.default("Query Error", "Error While Fetching Album Document", 500);
        }
        await User_1.UserModel.findByIdAndUpdate(userId, { $push: { recentlyViewed: albumId } });
    }
    catch (e) {
        throw e;
    }
};
exports.addAlbumToRecents = addAlbumToRecents;
