"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("./authentication")); // name router whatever you want
const users_1 = __importDefault(require("./users"));
const playlists_1 = __importDefault(require("./playlists"));
const library_1 = __importDefault(require("./library"));
const track_1 = __importDefault(require("./track"));
const dashboard_1 = __importDefault(require("./dashboard"));
const media_1 = __importDefault(require("./media"));
const artist_1 = __importDefault(require("./artist"));
const router = (0, express_1.Router)();
exports.default = () => {
    (0, authentication_1.default)(router);
    (0, users_1.default)(router);
    (0, playlists_1.default)(router);
    (0, library_1.default)(router);
    (0, track_1.default)(router);
    (0, dashboard_1.default)(router);
    (0, media_1.default)(router);
    (0, artist_1.default)(router);
    return router;
};
