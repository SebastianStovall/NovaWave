import mongoose, { Schema } from 'mongoose';

const PlaylistSchema = new Schema({
    owners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    title: { type: String, required: true },
    desc: { type: String, required: false },
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
    numSongs: { type: Number, required: true },
    length: { type: String, required: true },

}, {timestamps: true});


export const PlaylistModel = mongoose.model('Playlist', PlaylistSchema) // turn this schema into a table/collection
