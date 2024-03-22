import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { usePalette } from 'react-palette'

// import { addMediaToRecentlyViewed } from '../../store/media/media'
import { updateCurrentMedia } from '../../store/media/media'

import { hexToRgb } from '../../utils/gradientOverlayUtils'
import styles from './artistView.module.css'

export const ArtistView: React.FC = () => {
    const location = useLocation();
    const mediaType = location.pathname.split('/')[1];
    const mediaId = location.pathname.split('/')[2];

    const artistData: any = useAppSelector((state) => state.media.artistData)
    const dispatch = useAppDispatch()
    const { data } = usePalette(artistData?.bannerImage);

    useEffect(() => {
        let mediaInfo = {mediaType, mediaId}
        // dispatch(addMediaToRecentlyViewed(mediaInfo)) //TODO ---> fix
        dispatch(updateCurrentMedia(mediaInfo))
    }, [dispatch, location.pathname, mediaId, mediaType])

    return (
        <div>
            <div className={styles.mediaContent} style={{backgroundImage: `url(${artistData?.bannerImage})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                {/* Artist name and monthly listners relative div here */}
                <div className={styles.coverBackground}>
                    {/* USED FOR FADE IN AND OUT OF COVER IMAGE */}
                </div>
                <div className={styles.bannerArtistInfo}>
                    <h1>{artistData?.name}</h1>
                    <p>{artistData?.monthlyListeners} monthly listeners</p>
                </div>
            </div>

            <div className={styles.songsContainer} style={{background: `linear-gradient(rgba(0,0,0,.6) 0,rgba(18,18,18,1) 240px),rgba(${hexToRgb(data.muted)}, 1)`}}>

            </div>
        </div>

    )
}
