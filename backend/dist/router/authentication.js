"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.post('/auth/register', authentication_1.register);
    router.post('/auth/login', authentication_1.login);
    router.get('/auth/logout', middleware_1.isAuthenticated, authentication_1.logout);
    router.get('/auth/restore', middleware_1.isLoggedIn, authentication_1.restoreUser);
};
