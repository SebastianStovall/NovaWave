"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateUserLibrary = exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUsers = void 0;
const User_1 = require("../models/User");
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
// helper actions for User (used in controller functions)
const getUsers = async () => {
    try {
        const users = await User_1.UserModel.find();
        return users;
    }
    catch (e) {
        throw new CustomError_1.default("queryError", "Error while querying User collection using find()", 500);
    }
};
exports.getUsers = getUsers;
const getUserByEmail = (email) => {
    try {
        return User_1.UserModel.findOne({ email });
    }
    catch (e) {
        throw e;
    }
};
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sessionToken) => User_1.UserModel.find({
    "authentication.sessionToken": sessionToken,
}); // verify if a user is logged in
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = (id) => User_1.UserModel.findById(id);
exports.getUserById = getUserById;
const createUser = async (values) => {
    try {
        const user = await User_1.UserModel.create(values); // when using pre-middleware, specifically use mongoose create method to ensure it triggers
        return user.toObject();
    }
    catch (e) {
        throw e;
    }
};
exports.createUser = createUser;
const updateUserById = (id, values) => User_1.UserModel.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
const deleteUserById = async (id) => {
    try {
        const deletedUser = await User_1.UserModel.findOneAndDelete({ _id: id });
        return deletedUser;
    }
    catch (e) {
        throw new CustomError_1.default("UserNotFound", "Cannot delete this user. No user exists with this id", 404);
    }
};
exports.deleteUserById = deleteUserById;
const populateUserLibrary = async (userId) => {
    try {
        const user = await (0, exports.getUserById)(userId);
        if (user) {
            const populatedUser = await user.populate('playlists albums artists');
            return populatedUser;
        }
    }
    catch (e) {
        throw e;
    }
};
exports.populateUserLibrary = populateUserLibrary;
