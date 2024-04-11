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
        y: 0,
        entityType: '',
        entityId: '',
        userLibrary: {},
        setLibraryUpdated: (value: boolean) => {} // Initial value for setLibraryUpdated
    }

    // use to reset top of page when navigating
    const mainContent = document.querySelector('.layout_mainContent__ZQulu') as HTMLDivElement | null;
    const header = document.querySelector('.header_header__lOwdN') as HTMLDivElement | null;

    // local state
    const userLibrary = useAppSelector((state) => state.library );
    const user: any = useAppSelector((state) => state.session.user);
    const [contextMenu, setContextMenu] = useState(initialContextMenu); // store the initial context menu in state

    // hot refresh UI update
    const [libraryUpdated, setLibraryUpdated] = useState<boolean>(false);

    // hooks
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserLibraryThunk());
    }, [dispatch, libraryUpdated]);

    useEffect(() => { // reset for subsequent UI updates
        if (libraryUpdated) {
            setLibraryUpdated(false);
        }
    }, [libraryUpdated]);

    if(!userLibrary.isLoaded) {
        return null
    }


    const isMobileView = sidebarWidth === 80;  //! NEEDED FOR STYLE CHANGES WHEN USER RE-SIZE SIDEBAR (media queries only for window resize)
    const is584OrLarger = sidebarWidth >= 584; //! NEEDED FOR STYLE CHANGES WHEN USER RE-SIZE SIDEBAR (media queries only for window resize)

    // context menu functions

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, entityType: string, entityId: string) => {
        e.preventDefault() // prevents default right-click content from displaying

        const {pageX, pageY} = e
        setContextMenu({show: true, x: pageX, y: pageY, entityType, entityId, userLibrary, setLibraryUpdated: setLibraryUpdated })
    }

    const contextMenuClose = () => { // reset to initialContextMenu (show: close)
        setContextMenu(initialContextMenu)
    }


    return (
        <>
            {contextMenu.show &&
            <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                entityType={contextMenu.entityType}
                entityId={contextMenu.entityId}
                userLibrary={userLibrary}
                setLibraryUpdated={setLibraryUpdated}
                closeContextMenu={contextMenuClose}
            />
            } {/* Doesn't matter where you put Context Menu, just needs to be somewhere on the output JSX */}

            <div className={styles.resizableSidebarContainer}>
                <div className={styles.resizableSidebar} style={{ width: sidebarWidth }}> {/* inital width of container contained in state, but changed with events */}

                    {/* //* --- SIDEBAR CONTENT BEGIN --- */}

                    <div className={styles.topNav}>
                        <ul>
                            <li onClick={() => {
                                if(mainContent && header) {
                                    mainContent.scrollTop = 0
                                    header.style.background = 'transparent'
                                }
                            }}>
                                <Link to="/">
                                    <span className="fa fa-home"></span>
                                    {!isMobileView && <span>Home</span>}
                                </Link>
                            </li>

                            <li>
                                <Link to="/" onClick={() => alert('Search Feature Currently Unavailable')}>
                                    <span className="fa fa-search"></span>
                                    {!isMobileView && <span>Search</span>}
                                </Link>
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

                            { user ? <div className={styles.userPlaylists}>
                                {Object.values(userLibrary.playlists).map(playlist => (
                                    <div
                                    key={playlist._id}
                                    className={styles.item}
                                    onContextMenu={(e) => handleContextMenu(e, 'playlist', playlist._id)} // tooltip available on this div
                                    onClick={() => {
                                        if(playlist._id === user.likedSongsPlaylistId && mainContent && header) {
                                            mainContent.scrollTop = 0
                                            header.style.background = 'transparent'
                                            navigate('/collection/tracks')
                                        }
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
                                    onContextMenu={(e) => handleContextMenu(e, 'album', album._id)} // tooltip available on this div
                                    onClick={() => {
                                        if(mainContent && header) {
                                            mainContent.scrollTop = 0
                                            header.style.background = 'transparent'
                                            navigate(`/album/${album._id}`)
                                        }
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
                                    onContextMenu={(e) => handleContextMenu(e, 'artist', artist._id)} // tooltip available on this div
                                    onClick={() => {
                                        if(mainContent && header) {
                                            mainContent.scrollTop = 0
                                            header.style.background = 'transparent'
                                            navigate(`/artist/${artist._id}`)
                                        }
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
                            </div> :

                            // if user not signed in, they will see this library sidebar content
                            <>
                                <div className={styles.redirectUser}>
                                    <h3>Create your first playlist</h3>
                                    <p>Its easy, we'll help you</p>
                                    <button onClick={() => navigate('/login')}>Create playlist</button>
                                </div>

                                <div className={styles.redirectUser}>
                                    <h3>Let's find some artists to follow</h3>
                                    <p>We'll keep you updated on upcoming artists</p>
                                    <button onClick={() => navigate('/login')}>Browse artists</button>
                                </div>
                            </>

                            }

                        </div>
                    </div>

                    {/* //* --- SIDEBAR CONTENT END --- */}

                </div>
            </div>
            <div className={styles.resizebar} onMouseDown={handleMouseDown}></div> {/* attach handleMouseDown to resizebar div */}
        </>
    );
};
