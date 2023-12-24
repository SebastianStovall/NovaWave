"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playlists_1 = require("../controllers/playlists");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.get('/playlists', middleware_1.isAuthenticated, playlists_1.getUserPlaylists);
    router.post('/playlists/new', middleware_1.isAuthenticated, playlists_1.createNewPlaylist);
    router.post('/playlists/add', middleware_1.isAuthenticated, playlists_1.addTrackToPlaylist);
    router.post('/playlists/addToLikedSongs', middleware_1.isAuthenticated, playlists_1.addTrackToLikedSongs);
    router.delete('/playlists/deleteTrack', middleware_1.isAuthenticated, playlists_1.deleteTrackFromPlaylist);
    router.delete('/playlists/deleteFromLikedSongs', middleware_1.isAuthenticated, playlists_1.removeTrackFromLikedSongs);
};
