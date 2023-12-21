"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUsers = void 0;
const users_1 = require("../db/users");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, users_1.getUsers)();
        return res.status(200).json(users);
    }
    catch (e) {
        if (e instanceof CustomError_1.default) {
            res.status(e.code).json({ message: e.name, error: e.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await (0, users_1.deleteUserById)(id);
        if (!deletedUser) {
            throw new CustomError_1.default('UserNotFound', 'Cannot delete this user. No user exists with this id', 404);
        }
        return res.json({ message: `Successfully Deleted User ${id}` });
    }
    catch (e) {
        if (e instanceof CustomError_1.default) {
            res.status(e.code).json({ message: e.name, error: e.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            throw new CustomError_1.default('MissingFieldError', 'A required field is missing', 422);
        }
        const user = await (0, users_1.getUserById)(id);
        if (user) {
            user.username = username;
            await user.save();
        }
        return res.status(200).json({ message: 'Successfully Updated User Info', user: user });
    }
    catch (e) {
        if (e instanceof CustomError_1.default) {
            res.status(e.code).json({ message: e.name, error: e.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
};
exports.updateUser = updateUser;
