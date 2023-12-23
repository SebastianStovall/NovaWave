"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
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
