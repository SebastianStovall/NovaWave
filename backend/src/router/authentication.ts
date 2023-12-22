import { Router } from 'express'
import { login, register, logout } from '../controllers/authentication'
import { isAuthenticated } from '../middleware'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.post('/auth/register', register)
    router.post('/auth/login', login)
    router.get('/auth/logout', isAuthenticated, logout)
}
