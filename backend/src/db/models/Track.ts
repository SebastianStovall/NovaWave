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

    album: { type: Schema.Types.ObjectId, ref: 'Album', required: false}, // if a track document doesnt have this album key, its a single (still uses album page UI, just slighly different)
    albumName: { type: String, required: false },

}, {timestamps: true});


export const TrackModel = mongoose.model('Track', TrackSchema) // turn this schema into a table/collection
