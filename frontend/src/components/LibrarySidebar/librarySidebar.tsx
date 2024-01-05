import React, {useEffect} from "react"
import styles from "./librarySidebar.module.css";
import { useSidebarResize } from "../../hooks/useSidebarResize";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserLibraryThunk } from "../../store/library/library";
import { convertTimestampToFormattedDate } from "../../utils/dateUtils";

export const LibrarySidebar: React.FC = () => {
    const { sidebarWidth, handleMouseDown } = useSidebarResize("left");
    const dispatch = useAppDispatch()

    const userPlaylists = useAppSelector(rootState => rootState.library.playlists);
    const userAlbums = useAppSelector(rootState => rootState.library.albums);
    const userArtists = useAppSelector(rootState => rootState.library.artists);

    const isMobileView = sidebarWidth === 80;  //! NEEDED FOR STYLE CHANGES WHEN USER RE-SIZE SIDEBAR (media queries only for window resize)
    const is584OrLarger = sidebarWidth >= 584; //! NEEDED FOR STYLE CHANGES WHEN USER RE-SIZE SIDEBAR (media queries only for window resize)

    console.log("RE RENDER")

    useEffect(() => {
        dispatch(getUserLibraryThunk());
    }, [dispatch]);

    return (
        <>
            <div className={styles.resizableSidebarContainer}>
                <div className={styles.resizableSidebar} style={{ width: sidebarWidth }}> {/* inital width of container contained in state, but changed with events */}

                    {/* //* --- SIDEBAR CONTENT BEGIN --- */}

                    <div className={styles.topNav}>
                        <ul>
                            <li>
                                <a href="/">
                                    <span className="fa fa-home"></span>
                                    <span id={styles.narrowMedia} className={isMobileView ? `${styles.narrowSpan}` : ``}>Home</span>
                                </a>
                            </li>

                            <li>
                                <a href="/">
                                    <span className="fa fa-search"></span>
                                    <span id={styles.narrowMedia} className={isMobileView ? `${styles.narrowSpan}` : ``}>Search</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div id={isMobileView ? `${styles.hideMainPadding}` : ''} className={styles.main}>
                        <div className={styles.yourLibrary}>
                            <a href="/">
                                <span id={isMobileView ? `${styles.hideBookMargin}` : `${styles.hideBookMar}`} className="fa fa-book"></span>
                                <span id={styles.narrowMedia} className={isMobileView ? `${styles.narrowSpan}` : `${styles.narrowMedia}`}>Your Library</span>
                            </a>
                            {!isMobileView && <div id={styles.narrowMedia} className={`${styles.addPlaylistPlus} fa fa-plus`}></div>}
                        </div>

                        <div className={styles.collection}>
                            {is584OrLarger && <div id={styles.hidden} className={styles.collectionHeadings}>
                                <p>Title</p>
                                <p>Date Added</p>
                            </div>}

                            <div className={styles.userPlaylists}>
                                {Object.values(userPlaylists).map(playlist => (
                                    <div key={playlist._id} className={styles.item}>
                                        <div className={styles.mainInfo}>
                                            <img src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="playlistPhoto"/>
                                            <div>
                                                {!isMobileView && <p className={styles.narrowMedia}>{playlist.title}</p>}
                                                {!isMobileView && <p className={styles.narrowMedia}>Playlist</p>}
                                            </div>
                                        </div>
                                        {is584OrLarger && <p className={styles.dateAdded}>{convertTimestampToFormattedDate(playlist.createdAt)}</p>}
                                    </div>
                                ))}

                                {Object.values(userAlbums).map(album => (
                                    <div key={album._id} className={styles.item}>
                                        <div className={styles.mainInfo}>
                                            <img src={album.image} alt="AlbumPhoto"/>
                                            <div>
                                                {!isMobileView && <p className={styles.narrowMedia}>{album.title}</p>}
                                                {!isMobileView && <p className={styles.narrowMedia}>Album</p>}
                                            </div>
                                        </div>
                                        {is584OrLarger && <p className={styles.dateAdded}>{convertTimestampToFormattedDate(album.updatedAt)}</p>}
                                    </div>
                                ))}

                                {Object.values(userArtists).map(artist => (
                                    <div key={artist._id} className={styles.item}>
                                        <div className={styles.mainInfo}>
                                            <img src={artist.aboutImage} alt="ArtistPhoto"/>
                                            <div>
                                                {!isMobileView && <p className={styles.narrowMedia}>{artist.name}</p>}
                                                {!isMobileView && <p className={styles.narrowMedia}>Artist</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* //* --- SIDEBAR CONTENT END --- */}

                </div>
            </div>
        <div className={styles.resizebar} onMouseDown={handleMouseDown}></div> {/* attach handleMouseDown to resizebar div */}
        </>
    );
};
