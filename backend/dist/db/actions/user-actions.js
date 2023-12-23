"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUsers = void 0;
const User_1 = require("../models/User");
// helper actions for User (used in controller functions)
const getUsers = () => // queries all documents in collection, return null if error occured in query
 User_1.UserModel.find()
    .exec()
    .catch((error) => {
    console.error(error);
    return null;
});
exports.getUsers = getUsers;
const getUserByEmail = (email) => User_1.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sessionToken) => User_1.UserModel.find({
    "authentication.sessionToken": sessionToken,
}); // verify if a user is logged in
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = (id) => User_1.UserModel.findById(id);
exports.getUserById = getUserById;
const createUser = (values) => new User_1.UserModel(values)
    .save()
    .then((user) => user.toObject())
    .catch((error) => {
    console.error('Error creating user:', error.message);
    return null;
});
exports.createUser = createUser;
const updateUserById = (id, values) => User_1.UserModel.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
const deleteUserById = async (id) => {
    try {
        const deletedUser = await User_1.UserModel.findOneAndDelete({ _id: id });
        return deletedUser;
    }
    catch (e) {
        return null;
    }
};
exports.deleteUserById = deleteUserById;
