import { useEffect } from 'react'
import { changeGradient, changeMediaInfo } from '../../store/header/header'
import { useMediaViewResize } from '../../hooks/useMediaViewResize'
import { usePalette } from 'react-palette'
import { hexToRgb } from '../../utils/gradientOverlayUtils'
import { useAppDispatch } from '../../hooks'
import styles from './mediaView.module.css'

export const MediaView: React.FC = () => {
    useMediaViewResize();
    const { data } = usePalette('https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Sahara-Album-8.jfif');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeGradient(`${hexToRgb(data.muted)}`))
        dispatch(changeMediaInfo(`Yin Yang Tapes: Summer Season (1989-1990)`))
    }, [dispatch, data.muted])

    return (
        <div className={styles.mediaView} style={{background: `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), rgba(${hexToRgb(data.muted)}, 1)`}}>

            <div className={styles.mediaContent}>
                <div className={styles.topCover}>
                    <img className={styles.coverImg} src='https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Sahara-Album-8.jfif' alt='media-cover' />
                </div>
                <div className={styles.topCoverInfo}>
                    <div className={styles.type}>Album/Playlist (refactor)</div>
                    <div className={styles.title}>
                        YIN YANG TAPES: Summer Season (1989-1990)
                    </div>
                    <div className={styles.stats}>
                        <img src='https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/%24B-ABOUT-Artist-1.jfif' width='24px' height='24px' alt='artist/owner' />
                        <span>Artist ·</span>
                        <span>YEAR ·</span>
                        <span># songs ,</span>
                        <span>__ min __ sec </span>
                    </div>
                </div>
            </div>

            {/* style={{background: `linear-gradient(rgba(0,0,0,.6) 0,rgba(18,18,18,1) 35%),rgba(${hexToRgb(data.muted)}, 1)`}} */}
            <div className={styles.songsContainer} style={{background: `linear-gradient(rgba(0,0,0,.6) 0,rgba(18,18,18,1) 240px),rgba(${hexToRgb(data.muted)}, 1)`}}>
                <div className={styles.controlButtons}>
                    <div className={styles.leftButtons}>
                        <div className={styles.resumeAndPause}>
                            <div className={`fas fa-play ${styles.playPause}`}></div>
                        </div>
                        <div className={styles.favoriteAndUnfavorite}>
                            {/* <i className="fa fa-heart"></i> */}
                            <i className="fa fa-heart-o"></i>
                        </div>
                        <div className={styles.moreOptions}>
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                        </div>
                    </div>
                    <div className={styles.rightButtons}>
                        <div className={styles.listView}>
                            List <i className="fa fa-list" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>

                <div className={styles.flexGrid}>

                    <div id={styles.stickyHead} className={styles.gridItem}>
                        <p>#</p>
                        <p>Title</p>
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path></svg>
                    </div>

                    {/* <!-- NUMBER OF ROWS DEPENDENT ON ALBUM/PLAYLIST --> */}
                    {Array.from({ length: 4 }, (_, index) => (
                        <div className={styles.gridItem} key={index}>
                            <div>1</div>
                            <div className={styles.song}>
                                <div>
                                    <p>Summer Season Intro</p>
                                    <p>$uicideboy$</p>
                                </div>
                                <i className="fa fa-heart-o"></i>
                            </div>
                            <div>
                                <p>0:40</p>
                                <div className={styles.moreOptionsflexGrid}>
                                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* <!-- NUMBER OF ROWS DEPENDENT ON ALBUM/PLAYLIST --> */}
                </div>
            </div>

        </div>
    )
}
