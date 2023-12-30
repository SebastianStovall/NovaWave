"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreUser = exports.logout = exports.login = exports.register = void 0;
const user_actions_1 = require("../db/actions/user-actions");
const auth_1 = require("../helpers/auth");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const lodash_1 = require("lodash");
const register = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            throw new CustomError_1.default("MissingFieldError", "A required field is missing", 422);
        }
        const existingUser = await (0, user_actions_1.getUserByEmail)(email);
        if (existingUser) {
            throw new CustomError_1.default("DuplicateAccountError", "This account is already registered", 409);
        }
        const salt = (0, auth_1.random)();
        const user = await (0, user_actions_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, auth_1.authentication)(salt, password), // store salted password in the database
            },
        });
        return res.status(200).json({ message: "Successfully Registered User", user: user });
    }
    catch (e) {
        next(e);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new CustomError_1.default("MissingFieldError", "A required field is missing", 422);
        }
        const user = await (0, user_actions_1.getUserByEmail)(email).select("+authentication.salt +authentication.password"); // INCLUDE AUTH DATA (non-selected by default)
        if (!user || !user.authentication || !user.authentication.salt) {
            throw new CustomError_1.default("UserNotFound", "email or password is incorrect", 401);
        }
        const expectedHash = (0, auth_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            // user input hashed password and stored hashed password need to match
            throw new CustomError_1.default("UserNotFound", "email or password is incorrect", 401);
        }
        const salt = (0, auth_1.random)(); // if login success, generate session token for this user
        user.authentication.sessionToken = (0, auth_1.authentication)(salt, user._id.toString());
        await user.save();
        const isLocalhost = process.env.NODE_ENV === 'local'; // check if on local or in production env
        res.cookie("AuthToken", user.authentication.sessionToken, {
            domain: isLocalhost ? "localhost" : "novawave.onrender.com", // set cookie domain based on env
            path: "/",
        }); // store session token as cookie
        res
            .status(200)
            .json({ message: "Successfully Logged In User", user: { id: user._id, email: user.email, username: user.username } });
    }
    catch (e) {
        next(e);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        const isLocalhost = process.env.NODE_ENV === 'local'; // check if on local or in production env
        res.clearCookie("AuthToken", { domain: isLocalhost ? "localhost" : "novawave.onrender.com", path: "/" });
        res.status(200).json({ message: "Successfully signed out user" });
    }
    catch (e) {
        next(e);
    }
};
exports.logout = logout;
const restoreUser = async (req, res, next) => {
    try {
        const user = (0, lodash_1.get)(req, "identity");
        return res.status(200).json({ message: 'User Logged In', isLoggedIn: true, user: { id: user._id, email: user.email, username: user.username } });
    }
    catch (e) {
        next(e);
    }
};
exports.restoreUser = restoreUser;
