import mongoose, { Schema } from 'mongoose';

const PLTrackSchema = new Schema({
        track: { type: Schema.Types.ObjectId, ref: 'Track' },
        addedAt: { type: Date, default: Date.now, required: false } // keep track of when each track was added
    }
, { _id: false }); // dont omit a _id field for this subSchema, its not needed

const PlaylistSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' }, // each playlist has a single owner, but people can also like your playlist and add it to their library (goes in their playlist array under User)
    likes: {type: Number, required: true, default: 0}, // displayed under playlist UI
    title: { type: String, required: true },
    desc: { type: String, required: false, default: '' },
    tracks: [PLTrackSchema], // subdocument
    length: { type: String, required: true, default: '0:00' },
    isPrivate: {type: Boolean, required: true, default: false} // INDICATES IF THIS PLAYLIST IS SEARCHABLE (when playlist are 'deleted', all that changes is this field)

}, {timestamps: true});

// TODO - Add Validations (ex: playlist title must be unique)


export const PlaylistModel = mongoose.model('Playlist', PlaylistSchema)
