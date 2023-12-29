require('dotenv').config() // load env variables on entry
const path = require('path');

import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser"; // makes data accessible through req.body due to parsing of incoming request data
import cookieParser from "cookie-parser"; // parse cookie data (for session token)
import compression from 'compression'; // compresses size of response bodies before sending data (increases loading time and bandwidth usage)
import cors from 'cors'; // enable CORS for all routes, any client allowed to make requests to our server
import router from "./router";
import CustomError from "./utils/CustomError";
import { connectToMongoDB } from "./db/connect";

const app = express();

app.use(cors({ // enforce certain routes to require authentication (require session token)
  credentials: true,
}))

app.use(json());
app.use(compression());
app.use(cookieParser());


const port = 8000;
app.listen(8000, () => {
  (async () => {
    await connectToMongoDB()
  })();
  console.log(`Example app listening on port ${port}`)
});


app.use('/api', router()) // router from router/index.ts


// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    // Serve the frontend's index.html file at the root route
    app.get('/', (req, res) => {
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });

    // Serve the static assets in the frontend's build folder
    app.use('/', express.static(path.join(__dirname, '../../frontend/build')));
}



app.use((err: Error, req: Request, res: Response, next: NextFunction) => { // cenertalized error handling if no routes are hit or middleware errors
  // handle errors
  if(err instanceof CustomError) {
    return res.status(err.code).json({ message: err.name, error: err.message });
  } else {
    return res.status(500).json({ message: err.message });
  }
});
