import { Router } from 'express'
import authentication from './authentication' // name router whatever you want
import users from './users'
import playlists from './playlists'
import library from './library'

const router = Router()

export default (): Router => { // wire all routers to single router to be used in app.ts
    authentication(router);
    users(router);
    playlists(router);
    library(router);

    return router
}
