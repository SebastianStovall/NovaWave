import { Router } from 'express'
import { updateCurrentMedia, grabDummyTrack } from '../controllers/media'

export default (router: Router) => { // include all req methods here and import their respective controller func, wire this router to index.ts
    router.patch('/media/update', updateCurrentMedia)
    router.get('/media/getDummyTrack', grabDummyTrack)
}
