import React, {useEffect, useState} from "react";
import { useSidebarResize } from "../../hooks/useSidebarResize";
import { toggleSidebar } from "../../store/sidebar/sidebar";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useNowPlayingSidebarResize } from "../../hooks/useNowPlayingSidebarResize";
import { dynamicMarquee, dynamicMarquee2 } from "../../utils/misc";
import { useNavigate, useLocation } from "react-router-dom";
import { addCommasToNumber } from "../../utils/audio/numberUtils";

import { LibraryState } from "../../store/library/libraryTypes";
import { getUserLibraryThunk } from "../../store/library/library";
import { getAllIdsInLikedSongs } from "../../store/media/media";
import { updateCurrentMedia } from "../../store/media/media";

import { isTargetSongInLikedSongs, handleFavoriteSong } from "../../utils/audio/likedSongsPlaylistHelpers";
import { isEntityInLibrary, handleAddOrRemoveFromLibrary } from "../../utils/fetch";

import styles from "./nowPlayingSidebar.module.css";
import mediaViewStyles from '../../pages/MediaView/mediaView.module.css'
import artistPageStyles from "../../pages/ArtistView/artistView.module.css"

export const NowPlayingSidebar: React.FC = () => {
    const { sidebarWidth, handleMouseDown } = useSidebarResize("right");
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    // location util help
    const location = useLocation();
    const mediaType = location.pathname.split('/')[1];
    const mediaId = location.pathname.split('/')[2];

    const currentSong: any = useAppSelector((state) => state.player.currentSong);
    const nowPlayingSidebarState = useAppSelector((state) => state.sidebar.active);

    // library state slice
    const userLibrary: LibraryState = useAppSelector((state) => state.library)

    // media state slice
    const likedSongs: any = useAppSelector((state) => state.media.likedSongIds)
    const likedSongsLoading: boolean = useAppSelector((state) => state.media.likedSongsLoading)

    // session state slice
    const user: any = useAppSelector((state) => state.session.user);


    // handle local UI updates
    const [likedSongsUpdated, setLikedSongsUpdated] = useState<boolean>(false)
    const [libraryUpdated, setLibraryUpdated] = useState<boolean>(false)

    useNowPlayingSidebarResize()

    const toggleNowPlayingSidebar = () => {
        dispatch(toggleSidebar());
    };

    // see if marquee is needed when changing to new song
    useEffect(() => {
        dynamicMarquee()
        dynamicMarquee2()
    }, [currentSong, nowPlayingSidebarState])

    useEffect(() => { // hot refresh inside of liked songs media view page
        let mediaInfo = {mediaType, mediaId}
        if(mediaInfo.mediaType === 'collection') mediaInfo.mediaType = 'playlist'
        if(mediaInfo.mediaId === 'tracks') mediaInfo.mediaId = user.likedSongsPlaylistId

        dispatch(updateCurrentMedia(mediaInfo))
    }, [dispatch, location.pathname, mediaId, mediaType, user.likedSongsPlaylistId, likedSongsUpdated])

    // UI HOT REFRESH
    useEffect(() => {
        dispatch(getUserLibraryThunk())
    }, [dispatch, libraryUpdated])

    useEffect(() => {
        dispatch(getAllIdsInLikedSongs())
    }, [dispatch, likedSongsUpdated]) // retreive new liked songs when adding/removing track for the new UI update

    useEffect(() => { // reset for subsequent UI updates
        if (likedSongsUpdated) {
            setLikedSongsUpdated(false);
        }
        if (libraryUpdated) {
            setLibraryUpdated(false);
        }
    }, [likedSongsUpdated, libraryUpdated]);

    if(likedSongsLoading) {
        return <p></p>
    }

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
                        <i
                            className={ isTargetSongInLikedSongs(currentSong?._id, likedSongs) === true ? 'fa fa-heart' : 'fa fa-heart-o'}
                            id={ isTargetSongInLikedSongs(currentSong?._id, likedSongs) === true ? mediaViewStyles.inLikedSongs : mediaViewStyles.notInLikedSongs}
                            onClick={() => {
                                handleFavoriteSong(currentSong?._id, user.likedSongsPlaylistId, likedSongs)
                                setLikedSongsUpdated(true);
                            }}
                        >
                        </i>
                    </button>
                </div>

                <h3 className={styles.artistName} onClick={() => navigate(`/artist/${currentSong.artist}`)}>{currentSong?.artistName}</h3>

                <div className={styles.aboutSection}>
                    <button>
                        <div className={styles.topCard} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%), url(${currentSong?.artistAboutImage})`}}>
                            <div className={styles.artistAboutText}>
                                <div>About the artist</div>
                            </div>
                        </div>
                        <div className={styles.bottomCard}>
                            <div className={styles.artistNameText}>
                                <p>{currentSong?.artistName}</p>
                            </div>
                            <div className={styles.bottomCardSubSection}>
                                <div>{addCommasToNumber(currentSong?.artistMonthlyListeners)} monthly listeners</div>
                                <div>
                                    <div
                                        className={artistPageStyles.followButton} style={{transform: 'scale(0.95)', alignContent: 'center'}}
                                        onClick={() => {
                                            handleAddOrRemoveFromLibrary('artist', mediaId, userLibrary)
                                            setLibraryUpdated(true)
                                        }}
                                    >
                                        {isEntityInLibrary('artist', mediaId, userLibrary) ? 'Following' : 'Follow'}
                                    </div>
                                </div>
                            </div>
                            {/* //TODO <span></span> ADD Bio Text */}
                        </div>
                    </button>
                </div>

            </div>

            </div>
        </div>
    );
};
