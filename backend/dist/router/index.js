"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const authentication_1 = __importDefault(require("./authentication")); // name router whatever you want
const users_1 = __importDefault(require("./users"));
const playlists_1 = __importDefault(require("./playlists"));
const library_1 = __importDefault(require("./library"));
const track_1 = __importDefault(require("./track"));
const router = (0, express_1.Router)();
// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    router.get('/', (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../../../frontend', 'build', 'index.html'));
    });
    // Serve the static assets in the frontend's build folder
    router.use(express_1.default.static(path.resolve("../../frontend/build")));
    // Serve the frontend's index.html file at all other routes NOT starting with /
    router.get(/^(?!\/?).*/, (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../../../frontend', 'build', 'index.html'));
    });
}
exports.default = () => {
    (0, authentication_1.default)(router);
    (0, users_1.default)(router);
    (0, playlists_1.default)(router);
    (0, library_1.default)(router);
    (0, track_1.default)(router);
    return router;
};
