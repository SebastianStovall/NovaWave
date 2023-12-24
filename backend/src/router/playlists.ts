import { Router } from 'express'
import { createNewPlaylist, getUserPlaylists, addTrackToPlaylist } from '../controllers/playlists'
import { isAuthenticated } from '../middleware'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.get('/playlists', isAuthenticated, getUserPlaylists)
    router.post('/playlists/new', isAuthenticated, createNewPlaylist)
    router.post('/playlists/add', isAuthenticated, addTrackToPlaylist)
}
