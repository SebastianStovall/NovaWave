import { Router } from 'express'
import { deleteUser, getAllUsers } from '../controllers/users'
import { isAuthenticated } from '../middleware'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.get('/users', isAuthenticated, getAllUsers)
    router.delete('/users/:id', deleteUser)
}
