"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // load env variables on entry
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser"); // makes data accessible through req.body due to parsing of incoming request data
const cookie_parser_1 = __importDefault(require("cookie-parser")); // parse cookie data (for session token)
const compression_1 = __importDefault(require("compression")); // compresses size of response bodies before sending data (increases loading time and bandwidth usage)
const cors_1 = __importDefault(require("cors")); // enable CORS for all routes, any client allowed to make requests to our server
const router_1 = __importDefault(require("./router"));
const CustomError_1 = __importDefault(require("./utils/CustomError"));
const connect_1 = require("./db/connect");
const path = require('path');
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, body_parser_1.json)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
// Serve static files from the React build directory
app.use(express_1.default.static(path.join(__dirname, '../../frontend/build')));
// Serve the React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});
const port = 8000;
app.listen(8000, () => {
    (async () => {
        await (0, connect_1.connectToMongoDB)();
    })();
    console.log(`Example app listening on port ${port}`);
});
app.use('/', (0, router_1.default)()); // router from router/index.ts
app.use((err, req, res, next) => {
    // handle errors
    if (err instanceof CustomError_1.default) {
        return res.status(err.code).json({ message: err.name, error: err.message });
    }
    else {
        return res.status(500).json({ message: err.message });
    }
});
