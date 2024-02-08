import { Router } from 'express'
import { isAuthenticated } from '../middleware'
import { buildQuickplayGrid, addEntityToRecentlyViewed, getDashboardGrids } from '../controllers/dashboard'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.get('/dashboard/quickplay', isAuthenticated, buildQuickplayGrid)
    router.get('/dashboard/addToRecents', isAuthenticated, addEntityToRecentlyViewed)
    router.get('/dashboard/gridInfo', isAuthenticated, getDashboardGrids)
}
