import { Router } from 'express'
import { generateQuickplayGrid, retreiveRecommendedForToday } from '../controllers/dashboard'
import { isAuthenticated } from '../middleware'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.post('/dashboard/quickplay/generate', isAuthenticated, generateQuickplayGrid)
    router.get('/dashboard/recommended', isAuthenticated, retreiveRecommendedForToday)
}
