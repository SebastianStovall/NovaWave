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

// TODO - Add Validations (ex: album title should be unique)


export const AlbumModel = mongoose.model('Album', AlbumSchema)




// {
//     _id: ObjectId('658b08ddc9cbeda4fa967a14'),
//     title: 'Sample Album',
//     artistName: 'John Doe',
//     artist: ObjectId('658b07dfc9cbeda4fa967a13'),
//     yearReleased: 2023,
//     image: 'https://example.com/samplealbum.jpg',
//     tracks: [ ObjectId('65879ab961db2497c5c9a001') ],
//     length: '45:30'
//   }
