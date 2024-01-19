import styles from './mediaView.module.css'
import { useMediaViewResize } from '../../hooks/useMediaViewResize'
import { usePalette } from 'react-palette'
import { hexToRgb } from '../../utils/gradientOverlayUtils'

export const MediaView: React.FC = () => {
    useMediaViewResize()
    const { data } = usePalette('https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.jfif');

    return (
        <div className={styles.mediaView} style={{background: `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), rgba(${hexToRgb(data.muted)}, 1)`}}>

            <div className={styles.mediaContent}>
                <div className={styles.topCover}>
                    <img className={styles.coverImg} src='https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.jfif' alt='media-cover' />
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
                        {/* <!-- CAN BE INFINITE NUMBER OF ROWS HERE --> */}
                        <div className={styles.gridItem}>
                            <div>1</div>
                            <div className={styles.song}>
                                <div>
                                    <p>Summer Season Intro</p>
                                    <p>Aritst</p>
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

                        <div className={styles.gridItem}>
                            <div>2</div>
                            <div className={styles.song}>
                                <div>
                                    <p>Bloody 98 (Feat. Ghostmane)</p>
                                    <p>Aritst</p>
                                </div>
                                <i className="fa fa-heart-o"></i>
                            </div>
                            <div>
                                <span>4:37</span>
                                <span className={styles.moreOptionsflexGrid}>
                                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                                </span>
                            </div>
                        </div>
                        {/* <!-- CAN BE INFINITE NUMBER OF ROWS HERE --> */}
                    </div>
                </div>

        </div>
    )
}
