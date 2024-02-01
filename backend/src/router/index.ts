import { Router } from 'express'
import authentication from './authentication' // name router whatever you want
import users from './users'
import playlists from './playlists'
import library from './library'
import tracks from './track'
import dashboard from './dashboard'

const router = Router()

export default (): Router => { // wire all routers to single router to be used in app.ts
    authentication(router);
    users(router);
    playlists(router);
    library(router);
    tracks(router);
    dashboard(router);

    return router
}
