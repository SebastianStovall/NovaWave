import { Router } from 'express'
import authentication from './authentication' // name router whatever you want
import users from './users'

const router = Router()

export default (): Router => { // wire all routers to single router to be used in app.ts
    authentication(router);
    users(router);

    return router
}
