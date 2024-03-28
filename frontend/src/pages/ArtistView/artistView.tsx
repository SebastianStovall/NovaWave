import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { usePalette } from 'react-palette'

// import { addMediaToRecentlyViewed } from '../../store/media/media'
import { updateCurrentMedia } from '../../store/media/media'
import { changeMediaInfo } from '../../store/header/header'
import { changeGradient } from '../../store/header/header'

import { handlePlayFromStart } from '../../utils/audio/mediaViewHelpers'

import { hexToRgb } from '../../utils/gradientOverlayUtils'
import styles from './artistView.module.css'
import mediaViewStyles from '../MediaView/mediaView.module.css'

export const ArtistView: React.FC = () => {
    const location = useLocation();
    const mediaType = location.pathname.split('/')[1];
    const mediaId = location.pathname.split('/')[2];

    const artistData: any = useAppSelector((state) => state.media.artistData)
    const dispatch = useAppDispatch()
    const { data } = usePalette(artistData !== null ? artistData.bannerImage : '');

    const currentAlbumMedia: any = useAppSelector((state) => state.media.albumData); //! NEED TO CREATE BACKEND ROUTE FOR THIS
    const currentPlaylistMedia: any = useAppSelector((state) => state.media.playlistData); //! NEED TO CREATE BACKEND ROUTE FOR THIS
    const play: any = useAppSelector((state) => state.player.play);
    const currentSong: any = useAppSelector((state) => state.player.currentSong);

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
                <div className={mediaViewStyles.controlButtons}>
                    <div className={mediaViewStyles.leftButtons}>
                        <div className={mediaViewStyles.resumeAndPause} onClick={() => handlePlayFromStart(currentAlbumMedia, currentPlaylistMedia, currentSong, mediaType, play, dispatch)}>
                            <div className={`${ play ? `fas fa-pause` : `fas fa-play`} ${mediaViewStyles.playPause}` }></div>
                        </div>
                        <button className={styles.followButton}>
                            Follow
                        </button>
                        <div className={mediaViewStyles.moreOptions}>
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                        </div>
                    </div>
                </div>

                <h2 className={styles.popularText}>Popular</h2>

                {/*
                <div className={styles.flexGrid}>
                    {mediaType === 'album' ? ( currentAlbumMedia?.tracks.map((track: any, index: number) => (
                        <div
                        className={`${styles.gridItem}`}
                        key={track._id}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        >

                            {
                                //* When NOT hovering over audio track, but if track is queued VS not queued
                            hoveredIndex !== index ?
                                <div
                                    id={currentSong._id === track._id ? styles.activeStyingsHovered : styles.trackNumber}
                                >
                                    {currentSong._id !== track._id ? index + 1 : (play ? '\u2223 \u2223' : index + 1)}
                                </div>
                                :
                                currentSong._id === track._id ? <div id={styles.togglePlay} onClick={() => play === true ? dispatch(setPlay(false)) : dispatch(setPlay(true))}>{play ? '\u2223 \u2223' : `\u25B6`}</div> : <div id={styles.togglePlayGrey} onClick={() => handlePlayFromTrackNumber(currentAlbumMedia, currentPlaylistMedia, index, dispatch)} >{`\u25B6`}</div>
                                //* When hovering over audio, if track is queued VS not queued
                            }

                            <div className={styles.song}>
                                <div>
                                    <p id={currentSong._id === track._id ? styles.activeTitleText : ''}>{track.title}</p>
                                    <p>{track.artistName}</p>
                                </div>
                                <i className="fa fa-heart-o"></i>
                            </div>
                            <div>
                                <p>{track.length}</p>
                                <div className={styles.moreOptionsflexGrid}>
                                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                                </div>
                            </div>
                        </div> )) ) : null
                    }
                </div>
                */}

            </div>
        </div>

    )
}
