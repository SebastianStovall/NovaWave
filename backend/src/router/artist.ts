import { Router } from 'express'
import { getArtistTopSongs, getArtistDiscography } from '../controllers/artist'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.post('/artist/getTopSongs', getArtistTopSongs)
    router.post('/artist/getDiscography', getArtistDiscography)
}
