import { Router } from 'express'
import { addEntityToLibrary, removeEntityFromLibrary, retreiveUserLibrary, getLikedSongs } from '../controllers/library'
import { isAuthenticated, isLoggedIn } from '../middleware'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.get('/library', isLoggedIn, retreiveUserLibrary)
    router.get('/library/likedSongs', isAuthenticated, getLikedSongs)
    router.patch('/library/add', isAuthenticated, addEntityToLibrary)
    router.patch('/library/remove', isAuthenticated, removeEntityFromLibrary)
}
