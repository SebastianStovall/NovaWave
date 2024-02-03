"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQuickplayGrid = exports.addEntityToRecentlyViewed = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const lodash_1 = require("lodash");
const dashboard_actions_1 = require("../db/actions/dashboard-actions");
const dashboard_actions_2 = require("../db/actions/dashboard-actions");
const addEntityToRecentlyViewed = async (req, res, next) => {
    try {
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        const { entityId, entityType } = req.body;
        if (!entityId || !entityType) {
            throw new CustomError_1.default("Bad Request", "Entity information is missing in the request body", 400);
        }
        if (entityType !== 'artist' && entityType !== 'album' && entityType !== 'playlist') {
            throw new CustomError_1.default("Bad Request", `Entity type ${entityType} is invalid`, 400);
        }
        const wasAdded = await (0, dashboard_actions_2.addEntityToRecents)(currentUserId, entityId, entityType);
        if (wasAdded === 'added to recents') {
            return res.status(200).json({ message: `${entityType} has been added to user's recently viewed` });
        }
        else {
            return res.status(200).json({ message: `${entityType} is already in user's recently viewed.` });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.addEntityToRecentlyViewed = addEntityToRecentlyViewed;
const buildQuickplayGrid = async (req, res, next) => {
    try {
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // key into identify and grab ._id field
        const gridItems = await (0, dashboard_actions_1.getQuickplayDocuments)(currentUserId);
        res.status(200).json({ message: 'Quickplay grid successfully created', quickplayGrid: gridItems });
    }
    catch (e) {
        next(e);
    }
};
exports.buildQuickplayGrid = buildQuickplayGrid;
