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
const PLTrackSchema = new mongoose_1.Schema({
    track: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Track' },
    addedAt: { type: Date, default: () => Date.now, required: false } // keep track of when each track was added
}, { _id: false }); // dont omit a _id field for this subSchema, its not needed
const PlaylistSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }, // each playlist has a single owner, but people can also like your playlist and add it to their library (goes in their playlist array under User)
    likes: { type: Number, required: true, default: 0 }, // displayed under playlist UI
    title: { type: String, required: true },
    desc: { type: String, required: false, default: '' },
    tracks: [PLTrackSchema], // subdocument
    length: { type: String, required: true, default: '0:00' },
    isPrivate: { type: Boolean, required: true, default: false }, // INDICATES IF THIS PLAYLIST IS SEARCHABLE (when playlist are 'deleted', all that changes is this field)
    coverImage: { type: String, required: false } // AWS
}, { timestamps: true });
exports.PlaylistModel = mongoose_1.default.model('Playlist', PlaylistSchema);
