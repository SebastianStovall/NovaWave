import { Router } from 'express'
import { updateCurrentMedia, getArtistTopSongs } from '../controllers/media'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.get('/media/getTopSongs', getArtistTopSongs)
    router.patch('/media/update', updateCurrentMedia)
}
