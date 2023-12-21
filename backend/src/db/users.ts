import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false }, // avoids fetching password information in controller functions. Prevent data leak
        salt: {type: String, select: false}, // salting user password and verifying on login
        sessionToken: {type: String, select: false}
    },
});


export const UserModel = mongoose.model('User', UserSchema) // turn this schema into a table/collection


// actions for User (used in controller functions)

export const getUsers = () => UserModel.find() // queries all documents in collection

export const getUserByEmail = (email: string) => UserModel.findOne({email})

export const getUserBySessionToken = (sessionToken: string) => UserModel.find({
    'authentication.sessionToken': sessionToken
}) // verify if a user is logged in
export const getUserById = (id: string) => UserModel.findById(id)

// Record ---> take in an object with string keys and values of any type
// save to DB and return it as an object so its digestible
export const createUser = (values: Record<string, any>) => new UserModel(values).save()
.then((user) => user.toObject())

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)

export const deleteUserById = async(id: string) => {
    try {
        const deletedUser = await UserModel.findOneAndDelete({_id: id});
        return deletedUser;
    } catch(e) {
        return null
    }
}
