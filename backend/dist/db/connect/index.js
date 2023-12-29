"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromMongoDB = exports.connectToMongoDB = void 0;
require('dotenv').config(); // load env variables on entry
// connect to Mongo DB
const mongoose_1 = __importDefault(require("mongoose"));
const connectToMongoDB = async () => {
    try {
        const connectionString = process.env.MONGO_URL;
        if (!connectionString) {
            console.error("!!! MONGODB IS UNDEFINED !!! ---> ", connectionString);
        }
        mongoose_1.default.Promise = Promise;
        await mongoose_1.default.connect(connectionString);
        // mongoose.connection.on('error', (error: Error) => console.log(error))
        // mongoose.connection.once('open', () => {
        // });
        if (mongoose_1.default.connection.readyState === 1) { // if readyState = 1, successfully established connection
            console.log('Connected to MongoDB successfully');
        }
        else {
            console.log('Connected to MongoDB, but readyState is:', mongoose_1.default.connection.readyState);
        }
        return mongoose_1.default.connection.db;
    }
    catch (e) {
        console.error("Error establishing connection to MongoDB");
        throw e;
    }
};
exports.connectToMongoDB = connectToMongoDB;
const disconnectFromMongoDB = async () => {
    await mongoose_1.default.disconnect();
    console.log('Disconnected from MongoDB');
};
exports.disconnectFromMongoDB = disconnectFromMongoDB;
