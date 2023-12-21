"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const lodash_1 = require("lodash"); // get retreives nested object values and merge will merge two object's properties together
const users_1 = require("../db/users");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
// export const isOwner: RequestHandler = async(req, res, next) => {
// }
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies['Auth-Token'];
        if (!sessionToken) {
            throw new CustomError_1.default('UserNotAuthenticated', 'You do not have permission to access this requested resource', 403);
        }
        const existingUser = await (0, users_1.getUserBySessionToken)(sessionToken);
        if (!existingUser) {
            throw new CustomError_1.default('UserNotAuthenticated', 'You do not have permission to access this requested resource', 403);
        }
        (0, lodash_1.merge)(req, { identity: existingUser }); // if the user is authenticated, add a key to the req object called identity which includes the user's information
        return next();
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
exports.isAuthenticated = isAuthenticated;
