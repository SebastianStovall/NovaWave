"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("../controllers/library");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.get('/library', middleware_1.isLoggedIn, library_1.retreiveUserLibrary);
    router.patch('/library/add', middleware_1.isAuthenticated, library_1.addEntityToLibrary);
    router.patch('/library/remove', middleware_1.isAuthenticated, library_1.removeEntityFromLibrary);
};
