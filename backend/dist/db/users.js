"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false }, // avoids fetching password information in controller functions. Prevent data leak
        salt: { type: String, select: false }, // salting user password and verifying on login
        sessionToken: { type: String, select: false }
    },
});
exports.UserModel = mongoose_1.default.model('User', UserSchema); // turn this schema into a table/collection
// actions for User (used in controller functions)
const getUsers = () => exports.UserModel.find(); // queries all documents in collection
exports.getUsers = getUsers;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sessionToken) => exports.UserModel.find({
    'authentication.sessionToken': sessionToken
}); // verify if a user is logged in
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
// Record ---> take in an object with string keys and values of any type
// save to DB and return it as an object so its digestible
const createUser = (values) => new exports.UserModel(values).save()
    .then((user) => user.toObject());
exports.createUser = createUser;
const updateUserById = (id, values) => exports.UserModel.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
const deleteUserById = async (id) => {
    try {
        const deletedUser = await exports.UserModel.findOneAndDelete({ _id: id });
        return deletedUser;
    }
    catch (e) {
        return null;
    }
};
exports.deleteUserById = deleteUserById;
