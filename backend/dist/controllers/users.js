"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUsers = void 0;
const user_actions_1 = require("../db/actions/user-actions");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const getAllUsers = async (req, res, next) => {
    try {
        const users = await (0, user_actions_1.getUsers)();
        if (!users) {
            throw new CustomError_1.default("queryError", "Error while querying User collection using find()", 500);
        }
        return res.status(200).json(users);
    }
    catch (e) {
        next(e);
    }
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await (0, user_actions_1.deleteUserById)(id);
        if (!deletedUser) {
            throw new CustomError_1.default("UserNotFound", "Cannot delete this user. No user exists with this id", 404);
        }
        res.clearCookie("AuthToken", { domain: "localhost", path: "/" }); // clear session token after deleting account
        return res.json({ message: `Successfully Deleted User ${id}` });
    }
    catch (e) {
        next(e);
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            throw new CustomError_1.default("MissingFieldError", "A required field is missing", 422);
        }
        const user = await (0, user_actions_1.getUserById)(id);
        if (user) {
            user.username = username;
            await user.save();
        }
        return res
            .status(200)
            .json({ message: "Successfully Updated User Info", user: user });
    }
    catch (e) {
        next(e);
    }
};
exports.updateUser = updateUser;
