require('dotenv').config() // load env variables on entry

import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser"; // makes data accessible through req.body due to parsing of incoming request data
import cookieParser from "cookie-parser"; // parse cookie data (for session token)
import compression from 'compression'; // compresses size of response bodies before sending data (increases loading time and bandwidth usage)
import cors from 'cors'; // enable CORS for all routes, any client allowed to make requests to our server
import mongoose from "mongoose";

const app = express();

app.use(cors({ // enforce certain routes to require authentication (require session token)
  credentials: true,
}))

app.use(json());
app.use(compression());
app.use(cookieParser());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // handle errors
  res.status(500).json({ message: err.message }); // since error is specified, will yell at you if you dont return a 500
});


const port = 3000;
app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
});


// connect to Mongo DB
const connectionString = (process.env.MONGO_URL as string)
console.log("CONNECTION STRING", connectionString)

mongoose.Promise = Promise
mongoose.connect(connectionString).then(result => console.log('database connected')).catch(err => console.log(err))
// mongoose.connection.on('error', (error: Error) => console.log(error))
