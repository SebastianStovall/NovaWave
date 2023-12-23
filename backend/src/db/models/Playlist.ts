import mongoose, { Schema, Document } from 'mongoose';

interface IPlaylist extends Document {
    owners: Array<Schema.Types.ObjectId>
    title: string
    desc: string
    tracks: Array<Schema.Types.ObjectId>
    numSongs: number
    length: string
}

const PlaylistSchema = new Schema({
    owners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
    numSongs: { type: Number, required: true },
    length: { type: String, required: true },

}, {timestamps: true});


export const PlaylistModel = mongoose.model<IPlaylist>('Playlist', PlaylistSchema) // turn this schema into a table/collection



// TODO, create controller and router for playlist routes, test route to add a playlist to a user, and perform $push query to see if that works

const newPlaylist = new PlaylistModel({
    owners: [],
    title: 'Test Playlist One',
    desc: 'this is the first playlist for NovaWave',
    tracks: [],
    numSongs: 0,
    length: '0:00'
})
