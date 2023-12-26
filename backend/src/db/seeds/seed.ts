import { connectToMongoDB, disconnectFromMongoDB } from "../connect";
import { random, authentication } from "../../helpers/auth";

import { createUser } from "../actions/user-actions"; // NEEDED FOR PROPERLY ESTABLISH USERS DUE TO PRE-MIDDLEWARE IN SCHEMA

async function seedDatabase() {
    try {
        const db = await connectToMongoDB() // establish connection to database

        // UNSEED DB BEFORE SEEDING
        await db.collection("users").deleteMany({});

        // SEED USERS COLLECTION

        const saltUser1 = random()
        const saltUser2 = random()
        const saltUser3 = random()

        await createUser({
            email: "sebastianstovall@gmail.com",
            username: "SebassStovall",
            authentication: {
                salt: saltUser1,
                password: authentication(saltUser1, 'password'), // store salted password in the database
            },
        });

        await createUser({
            email: "foo@gmail.com",
            username: "Foo",
            authentication: {
                salt: saltUser2,
                password: authentication(saltUser2, 'password'), // store salted password in the database
            },
        });

        await createUser({
            email: "bar@gmail.com",
            username: "Bar",
            authentication: {
                salt: saltUser3,
                password: authentication(saltUser3, 'password'), // store salted password in the database
            },
        });

        console.log('Database seeded successfully.')
        return

    } catch (error) {
        // // If an error occurs, close the connection
        console.error('Error seeding the database:', error)
        await disconnectFromMongoDB()
        throw error;
    }
}

seedDatabase();
