"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("./authentication")); // name router whatever you want
const users_1 = __importDefault(require("./users"));
const playlists_1 = __importDefault(require("./playlists"));
const library_1 = __importDefault(require("./library"));
const track_1 = __importDefault(require("./track"));
const router = (0, express_1.Router)();
exports.default = () => {
    (0, authentication_1.default)(router);
    (0, users_1.default)(router);
    (0, playlists_1.default)(router);
    (0, library_1.default)(router);
    (0, track_1.default)(router);
    return router;
};
// import express, { Router } from 'express'
// import authentication from './authentication' // name router whatever you want
// import users from './users'
// import playlists from './playlists'
// import library from './library'
// import tracks from './track'
// const router = Router()
// const path = require('path');
// // Static routes
// // Serve React build files in production
// if (process.env.NODE_ENV === 'production') {
//     // Serve the frontend's index.html file at the root route
//     router.get('/', (req, res) => {
//         return res.sendFile(
//             path.resolve(__dirname, '../../../frontend', 'build', 'index.html')
//         );
//     });
//     // Serve the static assets in the frontend's build folder
//     router.use('/', express.static(path.join(__dirname, '../../../frontend/build')));
// }
// export default (): Router => { // wire all routers to single router to be used in app.ts
//     authentication(router);
//     users(router);
//     playlists(router);
//     library(router);
//     tracks(router);
//     return router
// }
