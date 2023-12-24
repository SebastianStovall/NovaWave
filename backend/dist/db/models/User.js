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
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Playlist_1 = require("./Playlist");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false }, // avoids fetching password information in controller functions. Prevent data leak
        salt: { type: String, select: false }, // salting user password and verifying on login
        sessionToken: { type: String, select: false }
    },
    playlists: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Playlist' }], // order by timestamps so likedSongs playlist will be first
    likedSongsPlaylistId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Playlist' } // specifically reference likedSongs playlist for 0(1) lookup when favoriting songs
}, { timestamps: true });
initLikedSongsPlaylist();
exports.UserModel = mongoose_1.default.model('User', UserSchema); // turn this schema into a table/collection
// PRE MIDDLEWARE ( triggered before save() to any User document )
function initLikedSongsPlaylist() {
    UserSchema.pre('save', async function (next) {
        if (this.isNew) { // IF THIS IS A NEW USER
            try {
                // initialize a liked songs playlist for this user
                const likedSongsPlaylist = await Playlist_1.PlaylistModel.create({
                    owner: this._id,
                    title: `Liked Songs`
                });
                this.playlists.push(likedSongsPlaylist._id); // add Liked Songs to User playlist array
                this.likedSongsPlaylistId = likedSongsPlaylist._id;
                console.log("User Init with Liked Songs Playlist");
            }
            catch (e) {
                console.error(e);
                return next(e);
            }
        }
        // playlist initialized, save user to DB
        next();
    });
}
