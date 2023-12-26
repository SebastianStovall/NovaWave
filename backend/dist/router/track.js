"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tracks_1 = require("../controllers/tracks");
exports.default = (router) => {
    router.get('/tracks/', tracks_1.getAllTracks);
    router.get('/tracks/playlists', tracks_1.getAllPlaylists);
    router.get('/tracks/albums', tracks_1.getAllAlbums);
    router.get('/tracks/artists', tracks_1.getAllArtists);
};
