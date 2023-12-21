"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.get('/users', middleware_1.isAuthenticated, users_1.getAllUsers);
    router.delete('/users/:id', users_1.deleteUser);
};
