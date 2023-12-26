import { Router } from 'express'
import { getAllTracks, getAllPlaylists, getAllAlbums, getAllArtists } from '../controllers/tracks'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.get('/tracks/', getAllTracks)
    router.get('/tracks/playlists', getAllPlaylists)
    router.get('/tracks/albums', getAllAlbums)
    router.get('/tracks/artists', getAllArtists)
}
