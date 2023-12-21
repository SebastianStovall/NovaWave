"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.get('/users', middleware_1.isAuthenticated, users_1.getAllUsers);
    router.delete('/users/:id', middleware_1.isAuthenticated, middleware_1.isOwner, users_1.deleteUser); // is Authenticated needs to be first to see identity key in req
    router.patch('/users/:id', middleware_1.isAuthenticated, middleware_1.isOwner, users_1.updateUser);
};
