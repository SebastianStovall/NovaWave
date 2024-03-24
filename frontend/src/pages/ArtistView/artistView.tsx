import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { usePalette } from 'react-palette'

// import { addMediaToRecentlyViewed } from '../../store/media/media'
import { updateCurrentMedia } from '../../store/media/media'
import { changeMediaInfo } from '../../store/header/header'
import { changeGradient } from '../../store/header/header'

import { hexToRgb } from '../../utils/gradientOverlayUtils'
import styles from './artistView.module.css'

export const ArtistView: React.FC = () => {
    const location = useLocation();
    const mediaType = location.pathname.split('/')[1];
    const mediaId = location.pathname.split('/')[2];

    const artistData: any = useAppSelector((state) => state.media.artistData)
    const dispatch = useAppDispatch()
    const { data } = usePalette(artistData !== null ? artistData.bannerImage : '');

    useEffect(() => {
        let mediaInfo = {mediaType, mediaId}
        // dispatch(addMediaToRecentlyViewed(mediaInfo)) //TODO ---> fix
        dispatch(updateCurrentMedia(mediaInfo))
    }, [dispatch, location.pathname, mediaId, mediaType])

    useEffect(() => {
        dispatch(changeMediaInfo(artistData?.name))
        dispatch(changeGradient(`${hexToRgb(data.muted)}`))
    }, [dispatch, data.muted, artistData])

    // TODO -- GONNA HAVE TO ADD THIS EVERYWHERE TO SCROLL TO TOP OF MAIN CONTENT AND RESET HEADER COLOR TO TRANSPARENT ----
    const mainContent = document.querySelector('.layout_mainContent__ZQulu') as HTMLElement;
    const header = document.querySelector('.header_header__lOwdN') as HTMLElement;
    if(mainContent) {
        mainContent.scrollTop = 0;
        header.style.background = 'transparent'
    }
    // TODO ---------------------------------------------------------------------------------------------------------------

    return (
        <div>
            <div className={styles.mediaContent} style={{backgroundImage: `url(${artistData?.bannerImage})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                {/* Artist name and monthly listners relative div here */}
                <div className={styles.coverBannerBackground}>
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
