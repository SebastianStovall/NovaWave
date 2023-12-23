import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false }, // avoids fetching password information in controller functions. Prevent data leak
        salt: {type: String, select: false}, // salting user password and verifying on login
        sessionToken: {type: String, select: false}
    },
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }]

}, {timestamps: true});


export const UserModel = mongoose.model('User', UserSchema) // turn this schema into a table/collection
