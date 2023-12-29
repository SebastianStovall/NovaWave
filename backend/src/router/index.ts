import express, { Router } from 'express'
import authentication from './authentication' // name router whatever you want
import users from './users'
import playlists from './playlists'
import library from './library'
import tracks from './track'

const router = Router()

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    router.get('/', (req, res) => {
        return res.sendFile(
        path.resolve(__dirname, '../../../frontend', 'build', 'index.html')
    );
    });

    // Serve the static assets in the frontend's build folder
    router.use(express.static(path.resolve("../../frontend/build")));

    // Serve the frontend's index.html file at all other routes NOT starting with /
    router.get(/^(?!\/?).*/, (req, res) => {
        return res.sendFile(
        path.resolve(__dirname, '../../../frontend', 'build', 'index.html')
    );
    });
}

export default (): Router => { // wire all routers to single router to be used in app.ts
    authentication(router);
    users(router);
    playlists(router);
    library(router);
    tracks(router);

    return router
}
