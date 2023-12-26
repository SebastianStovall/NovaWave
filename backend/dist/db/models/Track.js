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
    artistImage: { type: String, required: true }, // AWS
    artistId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Artist', required: true }, // only populate() when user clicks on artist Title from track UI
    artistName: { type: String, required: true }, // always loaded
    album: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Album', required: false }, // if a track document doesnt have this album key, its a single (STILL CLASSIFIED AS AN ALBUM IN SPOTIFY)
    albumName: { type: String, required: false }, // always loaded (if available)
}, { timestamps: true });
exports.TrackModel = mongoose_1.default.model('Track', TrackSchema); // turn this schema into a table/collection
// {
//     _id: ObjectId('65879ab961db2497c5c9a001'),
//     title: 'Sample Track',
//     length: '3:30',
//     audio: 'https://your-audio-url.com/sample.mp3',
//     image: 'https://your-image-url.com/sample-image.jpg',
//     artistImage: 'https://your-artist-image-url.com/artist-image.jpg',
//     artistId: ObjectId('658b07dfc9cbeda4fa967a13'),
//     artistName: 'Sample Artist',
//     album: ObjectId('658b08ddc9cbeda4fa967a14'),
//     albumName: 'Sample Album'
//   }
// track _id for above ^^^^  -------->   65879ab961db2497c5c9a001
// In MongoDB, when using references, you typically store an array of ObjectId references to represent relationships between documents.
// Each element in the array corresponds to a reference to another document.
// Using an object of reference ObjectId's is not a common or recommended approach in MongoDB. The reason for this is that MongoDB query language
// and operators are designed to work with arrays rather than objects.
