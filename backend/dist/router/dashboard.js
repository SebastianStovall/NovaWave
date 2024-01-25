"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../controllers/dashboard");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.get('/dashboard/quickplay', middleware_1.isAuthenticated, dashboard_1.generateQuickplayGrid);
};
