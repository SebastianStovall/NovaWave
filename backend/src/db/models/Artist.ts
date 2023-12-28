import mongoose, { Schema } from 'mongoose';

const ArtistSchema = new Schema({
    name: {type: String, required: true},
    bannerImage: {type: String, required: true},
    aboutImage: {type: String, required: true},
    monthlyListeners: {type: Number, required: true},
    description: {type: String, required: false},
    discography: [{ type: Schema.Types.ObjectId, ref: 'Album' }] // all of artist Albums  (for artist Popular section, its going to query Track table first 10 seconds with most listens)

}, {timestamps: true});


export const ArtistModel = mongoose.model('Artist', ArtistSchema)
