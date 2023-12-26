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
exports.ArtistModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ArtistSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    monthlyListeners: { type: Number, required: true },
    description: { type: String, required: false },
    discography: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Album' }] // all of artist Albums  (for artist Popular section, its going to query Track table first 10 seconds with most listens)
}, { timestamps: true });
// TODO - Add Validations (ex: artist name should be unique)
exports.ArtistModel = mongoose_1.default.model('Artist', ArtistSchema);
// {
//     _id: ObjectId('658b07dfc9cbeda4fa967a13'),
//     name: 'John Doe',
//     image: 'https://example.com/johndoe.jpg',
//     monthlyListeners: 1000000,
//     description: 'An amazing artist with a unique style.',
//     discography: [ ObjectId('658b08ddc9cbeda4fa967a14') ]
//   }
// TODO
// 4.) delete userCreatedAlbumroute will actually be through removeEntityFromLibrary ---> DECIDE IF WE ARE KEEPING SUBSCRIBED ALBUM STILL VIEWABLE IN OTHER PEOPLE'S LIBRARY (prolly)
//                                                                                     |
//                                                                                     >  If so, maybe have logic that says, if the album when its being deleted has 0 songs, actually delete it from DB, all other's will stay in NovaWave DB (albums will only be searchable if they have more than one song though.... AVOIDS QUERYING FOR LIKED SONG PLAYLIST WITH 0 LIKED SONGS)
// we could also add a public/private field on user created playlists, it will be 'private: false' by default...  when "deleting" an album, the key will get set to 'private: true', so if that album is removed in the future, will be no longer searchable by other users
// ENSURE AWS BUCKET IS READY FOR UPLOADS BEFORE SEEDING
// <audio controls>
//   <source src="https://your-s3-bucket-url/your-audio-file.mp3" type="audio/mp3">      <--- AWS LINK WITH .mp3 extension
//   Your browser does not support the audio tag.
// </audio>
// VALIDATIONS??
// 5.) consider adding routes for viewing all Tracks, Artists, and Albums for debugging/testing before attempting seed data