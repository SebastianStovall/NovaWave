import mongoose, { Schema } from 'mongoose';

const PlaylistSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' }, // each playlist has a single owner, but people can also like your playlist and add it to their library (goes in their playlist array under User)
    likes: {type: Number, required: true, default: 0}, // displayed under playlist UI
    title: { type: String, required: true },
    desc: { type: String, required: false, default: '' },
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
    numSongs: { type: Number, required: true, default: 0 },
    length: { type: String, required: true, default: '0:00' },

}, {timestamps: true});


export const PlaylistModel = mongoose.model('Playlist', PlaylistSchema) // turn this schema into a table/collection
