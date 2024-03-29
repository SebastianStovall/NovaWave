"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
const dashboard_1 = require("../controllers/dashboard");
exports.default = (router) => {
    router.get('/dashboard/quickplay', middleware_1.isAuthenticated, dashboard_1.buildQuickplayGrid);
    router.post('/dashboard/addToRecents', middleware_1.isAuthenticated, dashboard_1.addEntityToRecentlyViewed);
    router.get('/dashboard/gridInfo', middleware_1.isAuthenticated, dashboard_1.getDashboardGrids);
};
