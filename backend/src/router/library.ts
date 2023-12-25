import { Router } from 'express'
import { addEntityToLibrary, removePlaylistFromLibrary } from '../controllers/library'
import { isAuthenticated } from '../middleware'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.patch('/library/add', isAuthenticated, addEntityToLibrary)
    router.patch('/library/remove', isAuthenticated, removePlaylistFromLibrary)
}
