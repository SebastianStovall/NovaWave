require('dotenv').config() // load env variables on entry

// connect to Mongo DB
import mongoose from "mongoose"

export const connectToMongoDB = async() => {
    try {
        const connectionString = (process.env.MONGO_URL as string)

        if(!connectionString) {
            console.error("!!! MONGODB IS UNDEFINED !!! ---> ", connectionString)
        }

        mongoose.Promise = Promise
        await mongoose.connect(connectionString)

        // mongoose.connection.on('error', (error: Error) => console.log(error))
        // mongoose.connection.once('open', () => {
        // });

        if (mongoose.connection.readyState === 1) { // if readyState = 1, successfully established connection
            console.log('Connected to MongoDB successfully');
        } else {
            console.log('Connected to MongoDB, but readyState is:', mongoose.connection.readyState);
        }

        return mongoose.connection.db

    } catch(e) {
        console.error("Error establishing connection to MongoDB")
        throw e
    }
}


export const disconnectFromMongoDB = async () => {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
};
