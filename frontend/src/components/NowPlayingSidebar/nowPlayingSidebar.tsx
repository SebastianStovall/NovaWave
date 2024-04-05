import React, {useEffect} from "react";
import { useSidebarResize } from "../../hooks/useSidebarResize";
import { toggleSidebar } from "../../store/sidebar/sidebar";
import { useAppSelector, useAppDispatch } from "../../hooks";
import styles from "./nowPlayingSidebar.module.css";
import { useNowPlayingSidebarResize } from "../../hooks/useNowPlayingSidebarResize";
import { dynamicMarquee, dynamicMarquee2 } from "../../utils/misc";
import { useNavigate } from "react-router-dom";

export const NowPlayingSidebar: React.FC = () => {
    const { sidebarWidth, handleMouseDown } = useSidebarResize("right");
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const currentSong: any = useAppSelector((state) => state.player.currentSong);
    const nowPlayingSidebarState = useAppSelector((state) => state.sidebar.active);

    useNowPlayingSidebarResize()

    const toggleNowPlayingSidebar = () => {
        dispatch(toggleSidebar());
    };

    // see if marquee is needed when changing to new song
    useEffect(() => {
        dynamicMarquee()
        dynamicMarquee2()
    }, [currentSong, nowPlayingSidebarState])

    return (
        <div className={styles.resizableSidebarContainer}>
            <div className={styles.resizebar} onMouseDown={handleMouseDown}></div>
            <div className={styles.resizableSidebar} style={{ width: sidebarWidth }}>

            <div className={styles.contentContainer}>
                <div className={styles.topInformation}>
                    {/* All of this needed for scroll animation effect */}
                    <div className={styles.overflowContainer}>
                        <div className={styles.innerOverflowContainer}>
                            <div className={styles.secondInnerOverflowContainer}>
                                <div className={styles.containerForOverflowText}>
                                    <h2 className={styles.scrollText} onClick={() => navigate(`/album/${currentSong.album}`)}>{currentSong?.albumName}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* All of this needed for scroll animation effect */}
                    <button className={styles.closeSidebar} onClick={toggleNowPlayingSidebar}>
                        <svg aria-hidden="true" className={styles.x}>
                            <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z"></path>
                        </svg>
                    </button>
                </div>

                <div className={styles.albumImgCover}>
                    <img src={currentSong?.image} alt="album-img" />
                </div>

                <div className={styles.topInformation2}>
                    {/* Second Marquee Here for song name */}
                    <div className={styles.overflowContainer2}>
                        <div className={styles.innerOverflowContainer2}>
                            <div className={styles.secondInnerOverflowContainer2}>
                                <div className={styles.containerForOverflowText2}>
                                    <h2 className={styles.scrollText22} onClick={() => navigate(`/album/${currentSong.album}`)}>{currentSong?.title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Second Marquee Here for song name ^ */}
                    <button className={styles.addToCollection}>
                        <i className="fa fa-heart-o"></i>
                    </button>
                </div>

                <h3 className={styles.artistName} onClick={() => navigate(`/artist/${currentSong.artist}`)}>{currentSong?.artistName}</h3>

            </div>

            </div>
        </div>
    );
};
