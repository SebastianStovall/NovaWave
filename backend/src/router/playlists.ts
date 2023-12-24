import { Router } from 'express'
import { createNewPlaylist, getUserPlaylists, addTrackToPlaylist, deleteTrackFromPlaylist, addTrackToLikedSongs, removeTrackFromLikedSongs } from '../controllers/playlists'
import { isAuthenticated } from '../middleware'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.get('/playlists', isAuthenticated, getUserPlaylists)
    router.post('/playlists/new', isAuthenticated, createNewPlaylist)
    router.post('/playlists/add', isAuthenticated, addTrackToPlaylist)
    router.post('/playlists/addToLikedSongs', isAuthenticated, addTrackToLikedSongs)
    router.delete('/playlists/deleteTrack', isAuthenticated, deleteTrackFromPlaylist)
    router.delete('/playlists/deleteFromLikedSongs', isAuthenticated, removeTrackFromLikedSongs)
}
