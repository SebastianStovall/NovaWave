"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.isAuthenticated = exports.isOwner = void 0;
const lodash_1 = require("lodash"); // get retreives nested object values and merge will merge two object's properties together
const user_actions_1 = require("../db/actions/user-actions");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        if (!currentUserId || currentUserId.toString() !== id) {
            throw new CustomError_1.default("UserNotAuthenticated", "You do not have permission to access this requested resource", 403);
        }
        next();
    }
    catch (e) {
        return next(e);
    }
};
exports.isOwner = isOwner;
const isAuthenticated = async (req, res, next) => {
    // middleware to determine if user is authenticated
    try {
        const sessionToken = req.cookies["AuthToken"];
        const existingUser = await (0, user_actions_1.getUserBySessionToken)(sessionToken);
        if (!sessionToken || !existingUser) { // if no session token OR no existing user with that session
            throw new CustomError_1.default("UserNotAuthenticated", "You do not have permission to access this requested resource", 403);
        }
        (0, lodash_1.merge)(req, { identity: existingUser[0] }); // if the user is authenticated, add a key to the req object called identity which includes the user's information
        return next();
    }
    catch (e) {
        return next(e);
    }
};
exports.isAuthenticated = isAuthenticated;
const isLoggedIn = async (req, res, next) => {
    try {
        const sessionToken = req.cookies["AuthToken"];
        const existingUser = await (0, user_actions_1.getUserBySessionToken)(sessionToken);
        if (!sessionToken || !existingUser) { // if no session token OR no existing user with that session
            return res.status(200).json({ message: 'No Logged In User', isLoggedIn: false });
        }
        (0, lodash_1.merge)(req, { identity: existingUser[0] }); // if the user is authenticated, add a key to the req object called identity which includes the user's information
        return next();
    }
    catch (e) {
        return next(e);
    }
};
exports.isLoggedIn = isLoggedIn;
