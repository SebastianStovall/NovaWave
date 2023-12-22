"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const users_1 = require("../db/users");
const auth_1 = require("../helpers/auth");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            throw new CustomError_1.default('MissingFieldError', 'A required field is missing', 422);
        }
        const existingUser = await (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            throw new CustomError_1.default('DuplicateAccountError', 'This account is already registered', 409);
        }
        const salt = (0, auth_1.random)();
        const user = await (0, users_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, auth_1.authentication)(salt, password) // store salted password in the database
            }
        });
        return res.status(200).json({ message: 'Successfully Registered User', user: user });
    }
    catch (e) {
        console.log("ERROR STACK", e.stack);
        if (e instanceof CustomError_1.default) {
            res.status(e.code).json({ message: e.name, error: e.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new CustomError_1.default('MissingFieldError', 'A required field is missing', 422);
        }
        const user = await (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password'); // INCLUDE AUTH DATA (non-selected by default)
        if (!user || !user.authentication || !user.authentication.salt) {
            throw new CustomError_1.default('UserNotFound', 'email or password is incorrect', 401);
        }
        const expectedHash = (0, auth_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) { // user input hashed password and stored hashed password need to match
            throw new CustomError_1.default('UserNotFound', 'email or password is incorrect', 401);
        }
        const salt = (0, auth_1.random)(); // if login success, generate session token for this user
        user.authentication.sessionToken = (0, auth_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie('AuthToken', user.authentication.sessionToken, { domain: 'localhost', path: '/' }); // store session token as cookie
        res.status(200).json({ message: 'Successfully Logged In User', user: user });
    }
    catch (e) {
        console.log("ERROR STACK", e.stack);
        if (e instanceof CustomError_1.default) {
            res.status(e.code).json({ message: e.name, error: e.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.clearCookie('AuthToken', { domain: 'localhost', path: '/' });
        res.status(200).json({ message: 'Successfully signed out user' });
    }
    catch (e) {
        console.log("ERROR STACK", e.stack);
        res.status(500).json({ message: 'Internal Server Error', error: e.message });
    }
};
exports.logout = logout;
