import mongoose, { Schema } from 'mongoose';

const AlbumSchema = new Schema({
    title: { type: String, required: true },
    artistName: {type: String, required: true},
    // artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
    yearReleased: {type: Number, required: true},
    image: {type: String, required: false}, // AWS
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
    length: { type: String, required: true, default: '0:00' },

}, {timestamps: true});

// TODO - Add Validations (ex: album title should be unique)


export const AlbumModel = mongoose.model('Album', AlbumSchema)




//   {
//     _id: ObjectId('658906a52bf9b966b82ffcd1'),
//     title: 'Sample Album',
//     artistName: 'Sample Artist',
//     yearReleased: 2023,
//     image: 'sample_image_url',
//     tracks: [ ObjectId('65879ab961db2497c5c9a001') ]
//   }
