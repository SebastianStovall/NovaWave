import mongoose, { Schema } from 'mongoose';

const AlbumSchema = new Schema({
    title: { type: String, required: true },
    artistName: {type: String, required: true},
    artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
    yearReleased: {type: Number, required: true},
    image: {type: String, required: false}, // AWS
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
    length: { type: String, required: true, default: '0:00' },

}, {timestamps: true});


export const AlbumModel = mongoose.model('Album', AlbumSchema)
