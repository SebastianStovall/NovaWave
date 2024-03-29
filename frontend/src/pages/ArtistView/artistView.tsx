import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { usePalette } from 'react-palette'

// import { addMediaToRecentlyViewed } from '../../store/media/media'
import { updateCurrentMedia, retreiveArtistTopSongs } from '../../store/media/media'
import { changeMediaInfo } from '../../store/header/header'
import { changeGradient } from '../../store/header/header'

import { handlePlayFromStart, handlePlayFromTrackNumber } from '../../utils/audio/mediaViewHelpers'
import { setPlay } from '../../store/player/player'

import { hexToRgb } from '../../utils/gradientOverlayUtils'
import { addCommasToNumber } from '../../utils/audio/numberUtils'
import styles from './artistView.module.css'
import mediaViewStyles from '../MediaView/mediaView.module.css'

export const ArtistView: React.FC = () => {
    const { artistId } = useParams();
    const location = useLocation();
    const mediaType = location.pathname.split('/')[1];
    const mediaId = location.pathname.split('/')[2];

    const artistData: any = useAppSelector((state) => state.media.artistData)
    const dispatch = useAppDispatch()
    const { data } = usePalette(artistData !== null ? artistData.bannerImage : '');

    const currentAlbumMedia: any = useAppSelector((state) => state.media.albumData);
    const currentPlaylistMedia: any = useAppSelector((state) => state.media.playlistData);
    const play: any = useAppSelector((state) => state.player.play);
    const currentSong: any = useAppSelector((state) => state.player.currentSong);
    const artistTopSongs: any = useAppSelector((state) => state.media.artistTopSongs);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        let mediaInfo = {mediaType, mediaId}
        // dispatch(addMediaToRecentlyViewed(mediaInfo)) //TODO ---> THIS IS BROKEN.... ITS HAPPENING BECAUSE WHEN I GO TO ARTIST PAGE ITS http://localhost:3000/artist/UNDEFINED <--- MAKE SURE ARTIST INFO ALWAYS GETTING PASSED IN FROM DASHBOARD COMPONENT
        dispatch(updateCurrentMedia(mediaInfo))
    }, [dispatch, location.pathname, mediaId, mediaType])

    useEffect(() => {
        dispatch(retreiveArtistTopSongs(artistId))
    }, [dispatch, artistId])

    useEffect(() => {
        dispatch(changeMediaInfo(artistData?.name))
        dispatch(changeGradient(`${hexToRgb(data.muted)}`))
    }, [dispatch, data.muted, artistData])

    // // TODO -- GONNA HAVE TO ADD THIS EVERYWHERE TO SCROLL TO TOP OF MAIN CONTENT AND RESET HEADER COLOR TO TRANSPARENT ----
    // const mainContent = document.querySelector('.layout_mainContent__ZQulu') as HTMLElement;
    // const header = document.querySelector('.header_header__lOwdN') as HTMLElement;
    // if(mainContent) {
    //     mainContent.scrollTop = 0;
    //     header.style.background = 'transparent'
    // }
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
                    <p>{addCommasToNumber(artistData?.monthlyListeners)} monthly listeners</p>
                </div>
            </div>

            <div className={styles.songsContainer} style={{background: `linear-gradient(rgba(0,0,0,.6) 0,rgba(18,18,18,1) 240px),rgba(${hexToRgb(data.muted)}, 1)`}}>
                <div className={mediaViewStyles.controlButtons}>
                    <div className={mediaViewStyles.leftButtons}>
                        <div className={mediaViewStyles.resumeAndPause} onClick={() => handlePlayFromStart({tracks: artistTopSongs}, currentPlaylistMedia, currentSong, mediaType, play, dispatch)}>
                            <div className={`${ (play && currentSong.artist === mediaId) ? `fas fa-pause` : `fas fa-play`} ${mediaViewStyles.playPause}` }></div>
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

                <div className={mediaViewStyles.flexGrid}>
                    { artistTopSongs?.map((track: any, index: number) => (
                        <div
                        className={`${mediaViewStyles.gridItem}`}
                        key={track._id}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        >

                            {
                                //* When NOT hovering over audio track, but if track is queued VS not queued
                            hoveredIndex !== index ?
                                <div
                                    id={currentSong._id === track._id ? mediaViewStyles.activeStyingsHovered : mediaViewStyles.trackNumber}
                                >
                                    {currentSong._id !== track._id ? index + 1 : (play ? '\u2223 \u2223' : index + 1)}
                                </div>
                                :
                                currentSong._id === track._id ? <div id={mediaViewStyles.togglePlay} onClick={() => play === true ? dispatch(setPlay(false)) : dispatch(setPlay(true))}>{play ? '\u2223 \u2223' : `\u25B6`}</div> : <div id={mediaViewStyles.togglePlayGrey} onClick={() => handlePlayFromTrackNumber({tracks: artistTopSongs}, currentPlaylistMedia, index, dispatch)} >{`\u25B6`}</div>
                                //* When hovering over audio, if track is queued VS not queued
                            }

                            <div className={mediaViewStyles.song}>
                                <img src={track.image} width='40px' height='40px' style={{borderRadius: '5px'}} />
                                <div className={styles.testThis}>
                                    <p id={currentSong._id === track._id ? mediaViewStyles.activeTitleText : ''} className={styles.songTitle}>{track.title}</p>
                                    <span aria-label="Explicit" className={styles.explicit}>E</span>
                                </div>
                                <span className={styles.viewCount} style={{marginLeft: 'auto'}}>{addCommasToNumber(track.plays)}</span>
                                <i className="fa fa-heart-o" style={{marginLeft: 'auto'}}></i>
                            </div>
                            <div>
                                <p>{track.length}</p>
                                <div className={mediaViewStyles.moreOptionsflexGrid}>
                                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                                </div>
                            </div>
                        </div> ))
                    }
                </div>

            </div>
        </div>

    )
}
