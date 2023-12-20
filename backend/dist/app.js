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
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, body_parser_1.json)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((err, req, res, next) => {
    // handle errors
    res.status(500).json({ message: err.message }); // since error is specified, will yell at you if you dont return a 500
});
const port = 3000;
app.listen(3000, () => {
    console.log(`Example app listening on port ${port}`);
});
// connect to Mongo DB
const connectionString = process.env.MONGO_URL;
console.log("CONNECTION STRING", connectionString);
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(connectionString).then(result => console.log('database connected')).catch(err => console.log(err));
// mongoose.connection.on('error', (error: Error) => console.log(error))
