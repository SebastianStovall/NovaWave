"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addArtistToRecents = void 0;
const User_1 = require("../models/User");
const Artist_1 = require("../models/Artist");
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const addArtistToRecents = async (userId, artistId) => {
    try {
        const artist = await Artist_1.ArtistModel.findById(artistId);
        if (!artist) {
            throw new CustomError_1.default("Query Error", "Error While Fetching Artist Document", 500);
        }
        await User_1.UserModel.findByIdAndUpdate(userId, { $push: { recentlyViewed: artistId } });
    }
    catch (e) {
        throw e;
    }
};
exports.addArtistToRecents = addArtistToRecents;
