"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playlists_1 = require("../controllers/playlists");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.post('/playlists/new', middleware_1.isAuthenticated, playlists_1.createNewPlaylist);
    router.get('/playlists', middleware_1.isAuthenticated, playlists_1.getUserPlaylists);
};
