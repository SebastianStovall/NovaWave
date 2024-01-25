import { Router } from 'express'
import { generateQuickplayGrid } from '../controllers/dashboard'
import { isAuthenticated, isLoggedIn } from '../middleware'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.get('/dashboard/quickplay', isAuthenticated, generateQuickplayGrid)
}
