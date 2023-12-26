"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unseedDatabase = void 0;
const connect_1 = require("../connect");
async function unseedDatabase() {
    try {
        const db = await (0, connect_1.connectToMongoDB)();
        // UNSEED USERS COLLECTION
        await db.collection("users").deleteMany({});
        console.log('Database unseeded successfully.');
    }
    catch (error) {
        // If an error occurs, close the connection
        console.error('Error unseeding the database:', error);
        await (0, connect_1.disconnectFromMongoDB)();
        throw error;
    }
}
exports.unseedDatabase = unseedDatabase;
unseedDatabase();
