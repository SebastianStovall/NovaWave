"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// designed to only load neccessary track information at any point
const TrackSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    length: { type: String, required: true },
    audio: { type: String, required: true }, // AWS
    image: { type: String, required: true }, // AWS (will be album image if from album)
    plays: { type: Number, required: true },
    artist: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Artist', required: true }, // only populate() when user clicks on artist Title from track UI
    artistName: { type: String, required: true }, // always loaded
    artistAboutImage: { type: String, required: true }, // AWS
    artistMonthlyListeners: { type: Number, required: true },
    album: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Album', required: false }, // if a track document doesnt have this album key, its a single (STILL CLASSIFIED AS AN ALBUM IN SPOTIFY)
    albumName: { type: String, required: false }, // always loaded (if available)
}, { timestamps: true });
exports.TrackModel = mongoose_1.default.model('Track', TrackSchema); // turn this schema into a table/collection
