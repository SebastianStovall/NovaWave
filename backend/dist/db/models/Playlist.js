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
exports.PlaylistModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PlaylistSchema = new mongoose_1.Schema({
    owners: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tracks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Track' }],
    numSongs: { type: Number, required: true },
    length: { type: String, required: true },
}, { timestamps: true });
exports.PlaylistModel = mongoose_1.default.model('Playlist', PlaylistSchema); // turn this schema into a table/collection
// TODO, create controller and router for playlist routes, test route to add a playlist to a user, and perform $push query to see if that works
const newPlaylist = new exports.PlaylistModel({
    owners: [],
    title: 'Test Playlist One',
    desc: 'this is the first playlist for NovaWave',
    tracks: [],
    numSongs: 0,
    length: '0:00'
});
