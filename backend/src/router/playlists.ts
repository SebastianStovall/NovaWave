import { Router } from 'express'
import { createNewPlaylist } from '../controllers/playlists'
import { isAuthenticated } from '../middleware'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.post('/playlists/new', isAuthenticated, createNewPlaylist)
}
