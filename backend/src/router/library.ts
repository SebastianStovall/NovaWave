import { Router } from 'express'
import { addPlaylistToLibrary, removePlaylistFromLibrary } from '../controllers/library'
import { isAuthenticated } from '../middleware'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.patch('/library/add', isAuthenticated, addPlaylistToLibrary)
    router.patch('/library/remove', isAuthenticated, removePlaylistFromLibrary)
}
