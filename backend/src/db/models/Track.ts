import mongoose, { Schema } from 'mongoose';


// designed to only load neccessary track information at any point
const TrackSchema = new Schema({
    title: { type: String, required: true },
    length: { type: String, required: true},
    audio: { type: String, required: true }, // AWS
    image: { type: String, required: true}, // AWS (will be album image if from album)

    artistImage: { type: String, required: true}, // AWS
    artistId: { type: Schema.Types.ObjectId, ref: 'Artist', required: true}, // only populate() when user clicks on artist Title from track UI
    artistName: { type: String, required: true }, // always loaded

    album: { type: Schema.Types.ObjectId, ref: 'Album', required: false}, // if a track document doesnt have this album key, its a single (STILL CLASSIFIED AS AN ALBUM IN SPOTIFY)
    albumName: { type: String, required: false }, // always loaded (if available)

}, {timestamps: true});


export const TrackModel = mongoose.model('Track', TrackSchema) // turn this schema into a table/collection





    // {
    //     _id: ObjectId('65879ab961db2497c5c9a001'),
    //     title: 'Sample Track',
    //     length: '3:30',
    //     audio: 'https://your-audio-url.com/sample.mp3',
    //     image: 'https://your-image-url.com/sample-image.jpg',
    //     artistImage: 'https://your-artist-image-url.com/artist-image.jpg',
    //     artistId: ObjectId('658b07dfc9cbeda4fa967a13'),
    //     artistName: 'Sample Artist',
    //     album: ObjectId('658b08ddc9cbeda4fa967a14'),
    //     albumName: 'Sample Album'
    //   }


    // track _id for above ^^^^  -------->   65879ab961db2497c5c9a001

    // In MongoDB, when using references, you typically store an array of ObjectId references to represent relationships between documents.
    // Each element in the array corresponds to a reference to another document.
    // Using an object of reference ObjectId's is not a common or recommended approach in MongoDB. The reason for this is that MongoDB query language
    // and operators are designed to work with arrays rather than objects.
