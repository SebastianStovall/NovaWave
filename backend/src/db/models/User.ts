import mongoose, { Schema } from 'mongoose';
import { PlaylistModel } from './Playlist';

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false }, // avoids fetching password information in controller functions. Prevent data leak
        salt: {type: String, select: false}, // salting user password and verifying on login
        sessionToken: {type: String, select: false}
    },

    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }], // all playlists (user created, user liked, and liked songs playlist)
    albums: [{ type: Schema.Types.ObjectId, ref: 'Album' }], // all albums in user's collection
    artists: [{type: Schema.Types.ObjectId, ref: 'Artist'}], // all artists in user's collection
    likedSongsPlaylistId: { type: Schema.Types.ObjectId, ref: 'Playlist' } // specifically reference likedSongs playlist for 0(1) lookup when favoriting songs

}, {timestamps: true});

initLikedSongsPlaylist()

export const UserModel = mongoose.model('User', UserSchema) // turn this schema into a table/collection











// PRE MIDDLEWARE ( triggered before save() to any User document )

function initLikedSongsPlaylist() {
    UserSchema.pre('save', async function(next) { // initialize NEW user's with an empty liked songs playlist
        if (this.isNew) { // IF THIS IS A NEW USER
            try {
                // initialize a liked songs playlist for this user
                const likedSongsPlaylist = await PlaylistModel.create({
                        owner: this._id,
                        title: `Liked Songs`
                });

                this.playlists.push(likedSongsPlaylist._id); // add Liked Songs to User playlist array
                this.likedSongsPlaylistId = likedSongsPlaylist._id
                console.log("User Init with Liked Songs Playlist")

            } catch (e: any) {
                console.error(e)
                return next(e);
            }
        }

        // playlist initialized, save user to DB
        next();
    });
}
