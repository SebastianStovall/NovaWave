"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // load env variables on entry
const path = require('path');
const express_1 = __importStar(require("express"));
const body_parser_1 = require("body-parser"); // makes data accessible through req.body due to parsing of incoming request data
const cookie_parser_1 = __importDefault(require("cookie-parser")); // parse cookie data (for session token)
const compression_1 = __importDefault(require("compression")); // compresses size of response bodies before sending data (increases loading time and bandwidth usage)
const cors_1 = __importDefault(require("cors")); // enable CORS for all routes, any client allowed to make requests to our server
const router_1 = __importDefault(require("./router"));
const CustomError_1 = __importDefault(require("./utils/CustomError"));
const connect_1 = require("./db/connect");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: ['http://localhost:3000', 'https://novawave.onrender.com'] }));
app.use((0, body_parser_1.json)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
const port = 8000;
app.listen(8000, () => {
    (async () => {
        await (0, connect_1.connectToMongoDB)();
    })();
    console.log(`Example app listening on port ${port}`);
});
const routes = (0, express_1.Router)();
routes.use('/api', (0, router_1.default)()); // global router with all api routes
app.use(routes); // router from router/index.ts
// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    // Serve the frontend's index.html file at the root route
    routes.get('/', (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
    });
    // Serve the static assets in the frontend's build folder
    routes.use('/', express_1.default.static(path.join(__dirname, '../../frontend/build')));
    // Serve the frontend's index.html file at all other routes NOT starting with /api
    routes.get(/^(?!\/?api).*/, (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
    });
}
app.use((err, req, res, next) => {
    // handle errors
    console.log(`SOME ERROR OCCURED WHILE PERFORMING THIS REQUEST ----> ${req.url}`);
    console.error(`\nERROR MESSAGE ----> ${req.url}`, err.message);
    if (err instanceof CustomError_1.default) {
        return res.status(err.code).json({ message: err.name, error: err.message });
    }
    else {
        return res.status(500).json({ message: err.message });
    }
});
