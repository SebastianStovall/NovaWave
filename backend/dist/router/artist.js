"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const artist_1 = require("../controllers/artist");
exports.default = (router) => {
    router.post('/artist/getTopSongs', artist_1.getArtistTopSongs);
    router.post('/artist/getDiscography', artist_1.getArtistDiscography);
};
