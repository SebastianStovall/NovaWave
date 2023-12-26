import { Router } from 'express'
import { deleteUser, getAllUsers, updateUser } from '../controllers/users'
import { isAuthenticated, isOwner } from '../middleware'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.get('/users', isAuthenticated, getAllUsers)
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser) // is Authenticated needs to be first to see identity key in req
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
}
