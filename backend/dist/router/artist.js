"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const artist_1 = require("../controllers/artist");
exports.default = (router) => {
    router.post('/artist', artist_1.getArtistInformation);
    router.post('/artist/getTopSongs', artist_1.getArtistTopSongs);
};
