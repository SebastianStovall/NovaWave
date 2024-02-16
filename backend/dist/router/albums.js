"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
const albums_1 = require("../controllers/albums");
exports.default = (router) => {
    router.get('/albums/addToRecents', middleware_1.isAuthenticated, albums_1.addAlbumToRecentlyViewed);
};
