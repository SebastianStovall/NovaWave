import React, {useEffect, useState} from "react"
import styles from "./librarySidebar.module.css";
import { useSidebarResize } from "../../hooks/useSidebarResize";
import { convertTimestampToFormattedDate } from "../../utils/dateUtils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserLibraryThunk } from "../../store/library/library";
import { Link, useNavigate } from 'react-router-dom';
import { ContextMenu } from "../ContextMenu/contextMenu";

export const LibrarySidebar: React.FC = () => {
    const { sidebarWidth, handleMouseDown } = useSidebarResize("left");

    const initialContextMenu = { // default menu options for context menu
        show: false,
        x: 0,
        y: 0
    }

    // local state
    const userLibrary = useAppSelector((state) => state.library );
    const user: any = useAppSelector((state) => state.session.user);
    const [contextMenu, setContextMenu] = useState(initialContextMenu); // store the initial context menu in state

    // hooks
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserLibraryThunk());
    }, [dispatch]);

    if(!userLibrary.isLoaded) {
        return null
    }


    const isMobileView = sidebarWidth === 80;  //! NEEDED FOR STYLE CHANGES WHEN USER RE-SIZE SIDEBAR (media queries only for window resize)
    const is584OrLarger = sidebarWidth >= 584; //! NEEDED FOR STYLE CHANGES WHEN USER RE-SIZE SIDEBAR (media queries only for window resize)

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault() // prevents default right-click content from displaying

        const {pageX, pageY} = e
        setContextMenu({show: true, x: pageX, y: pageY})
    }

    const contextMenuClose = () => setContextMenu(initialContextMenu) // reset to initialContextMenu (show: close)

    return (
        <>
            {contextMenu.show && <ContextMenu x={contextMenu.x} y={contextMenu.y} closeContextMenu={contextMenuClose} />} {/* Doesn't matter where you put Context Menu, just needs to be somewhere on the output JSX */}

            <div className={styles.resizableSidebarContainer}>
                <div className={styles.resizableSidebar} style={{ width: sidebarWidth }}> {/* inital width of container contained in state, but changed with events */}

                    {/* //* --- SIDEBAR CONTENT BEGIN --- */}

                    <div className={styles.topNav}>
                        <ul>
                            <li>
                                <Link to="/">
                                    <span className="fa fa-home"></span>
                                    {!isMobileView && <span>Home</span>}
                                </Link>
                            </li>

                            <li>
                                <a href="/">
                                    <span className="fa fa-search"></span>
                                    {!isMobileView && <span>Search</span>}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div id={isMobileView ? `${styles.hideMainPadding}` : ''} className={styles.main}>
                        <div className={styles.yourLibrary}>
                            <a href="/">
                                <span id={isMobileView ? `${styles.hideBookMargin}` : ``} className="fa fa-book"></span>
                                {!isMobileView && <span>Your Library</span>}
                            </a>
                            {!isMobileView && <div className={`${styles.addPlaylistPlus} fa fa-plus`}></div>}
                        </div>

                        <div className={styles.collection}>
                            {is584OrLarger && <div id={styles.hidden} className={styles.collectionHeadings}>
                                <p>Title</p>
                                <p>Date Added</p>
                            </div>}

                            <div className={styles.userPlaylists}>
                                {Object.values(userLibrary.playlists).map(playlist => (
                                    <div
                                    key={playlist._id}
                                    className={styles.item}
                                    onContextMenu={(e) => handleContextMenu(e)} // tooltip available on this div
                                    onClick={() => {
                                        if(playlist._id === user.likedSongsPlaylistId) navigate('/collection/tracks')
                                    }}
                                    >
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

                                {Object.values(userLibrary.albums).map(album => (
                                    <div
                                    key={album._id}
                                    className={styles.item}
                                    onContextMenu={(e) => handleContextMenu(e)} // tooltip available on this div
                                    onClick={() => {
                                        navigate(`/album/${album._id}`)
                                    }}
                                    >
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

                                {Object.values(userLibrary.artists).map(artist => (
                                    <div
                                    key={artist._id}
                                    className={styles.item}
                                    onContextMenu={(e) => handleContextMenu(e)} // tooltip available on this div
                                    onClick={() => {
                                        navigate(`/artist/${artist._id}`)
                                    }}
                                    >
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
