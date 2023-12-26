import mongoose, { Schema } from 'mongoose';

const ArtistSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    monthlyListeners: {type: Number, required: true},
    description: {type: String, required: false},
    discography: [{ type: Schema.Types.ObjectId, ref: 'Album' }] // all of artist Albums  (for artist Popular section, its going to query Track table first 10 seconds with most listens)

}, {timestamps: true});

// TODO - Add Validations (ex: artist name should be unique)


export const ArtistModel = mongoose.model('Artist', ArtistSchema)



// {
//     _id: ObjectId('658b07dfc9cbeda4fa967a13'),
//     name: 'John Doe',
//     image: 'https://example.com/johndoe.jpg',
//     monthlyListeners: 1000000,
//     description: 'An amazing artist with a unique style.',
//     discography: [ ObjectId('658b08ddc9cbeda4fa967a14') ]
//   }



// TODO

// 1.) VALIDATIONS??


// 2.) ENSURE AWS BUCKET IS READY FOR UPLOADS BEFORE SEEDING

// <audio controls>
//   <source src="https://your-s3-bucket-url/your-audio-file.mp3" type="audio/mp3">      <--- AWS LINK WITH .mp3 extension
//   Your browser does not support the audio tag.
// </audio>


// 4.) make a track router
    // getAllTracks
    // getAllAlbums
    // getAllArtists
    // getAllPlaylists
