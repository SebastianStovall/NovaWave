"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../connect");
const auth_1 = require("../../helpers/auth");
const user_actions_1 = require("../actions/user-actions"); // NEEDED FOR PROPERLY ESTABLISH USERS DUE TO PRE-MIDDLEWARE IN SCHEMA
async function seedDatabase() {
    try {
        const db = await (0, connect_1.connectToMongoDB)(); // establish connection to database
        // UNSEED DB BEFORE SEEDING
        await db.collection("users").deleteMany({});
        // SEED USERS COLLECTION
        const saltUser1 = (0, auth_1.random)();
        const saltUser2 = (0, auth_1.random)();
        const saltUser3 = (0, auth_1.random)();
        await (0, user_actions_1.createUser)({
            email: "sebastianstovall@gmail.com",
            username: "SebassStovall",
            authentication: {
                salt: saltUser1,
                password: (0, auth_1.authentication)(saltUser1, 'password'), // store salted password in the database
            },
        });
        await (0, user_actions_1.createUser)({
            email: "foo@gmail.com",
            username: "Foo",
            authentication: {
                salt: saltUser2,
                password: (0, auth_1.authentication)(saltUser2, 'password'), // store salted password in the database
            },
        });
        await (0, user_actions_1.createUser)({
            email: "bar@gmail.com",
            username: "Bar",
            authentication: {
                salt: saltUser3,
                password: (0, auth_1.authentication)(saltUser3, 'password'), // store salted password in the database
            },
        });
        console.log('Database seeded successfully.');
        return;
    }
    catch (error) {
        // // If an error occurs, close the connection
        console.error('Error seeding the database:', error);
        await (0, connect_1.disconnectFromMongoDB)();
        throw error;
    }
}
seedDatabase();
