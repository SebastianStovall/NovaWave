"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../controllers/dashboard");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.post('/dashboard/quickplay/generate', middleware_1.isAuthenticated, dashboard_1.generateQuickplayGrid);
    router.get('/dashboard/recommended', middleware_1.isAuthenticated, dashboard_1.retreiveRecommendedForToday);
};
