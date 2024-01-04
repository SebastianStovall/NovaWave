import React, {useEffect, useState} from "react";
import librarySidebar from "./library-sidebar.module.css";
import { useSidebarResize } from "../../hooks/useSidebarResize";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserLibraryThunk } from "../../store/library/library";
import { convertTimestampToFormattedDate } from "../../utils/dateUtils";

export const LibrarySidebar: React.FC = () => {
    const { sidebarWidth, handleMouseDown } = useSidebarResize("left");
    const [loading, setLoading] = useState<Boolean>(true);
    const dispatch = useAppDispatch()

    const userPlaylists = useAppSelector(rootState => rootState.library.playlists);
    const userAlbums = useAppSelector(rootState => rootState.library.albums);
    const userArtists = useAppSelector(rootState => rootState.library.artists);

    const isMobileView = sidebarWidth === 80;  //! NEEDED FOR STYLE CHANGES WHEN USER RE-SIZE SIDEBAR (media queries only for window resize)
    const is584OrLarger = sidebarWidth >= 584; //! NEEDED FOR STYLE CHANGES WHEN USER RE-SIZE SIDEBAR (media queries only for window resize)

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getUserLibraryThunk());
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    if (loading) return <p>Loading...</p>

    return (
        <>
            <div className={librarySidebar.resizableSidebarContainer}>
                <div className={librarySidebar.resizableSidebar} style={{ width: sidebarWidth }}> {/* inital width of container contained in state, but changed with events */}

                    {/* //* --- SIDEBAR CONTENT BEGIN --- */}

                    <div className={librarySidebar.topNav}>
                        <ul>
                            <li>
                                <a href="/">
                                    <span className="fa fa-home"></span>
                                    <span id={librarySidebar.narrowMedia} className={isMobileView ? `${librarySidebar.narrowSpan}` : ``}>Home</span>
                                </a>
                            </li>

                            <li>
                                <a href="/">
                                    <span className="fa fa-search"></span>
                                    <span id={librarySidebar.narrowMedia} className={isMobileView ? `${librarySidebar.narrowSpan}` : ``}>Search</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div id={isMobileView ? `${librarySidebar.hideMainPadding}` : ''} className={librarySidebar.main}>
                        <div className={librarySidebar.yourLibrary}>
                            <a href="/">
                                <span id={isMobileView ? `${librarySidebar.hideBookMargin}` : `${librarySidebar.hideBookMar}`} className="fa fa-book"></span>
                                <span id={librarySidebar.narrowMedia} className={isMobileView ? `${librarySidebar.narrowSpan}` : `${librarySidebar.narrowMedia}`}>Your Library</span>
                            </a>
                            {!isMobileView && <div id={librarySidebar.narrowMedia} className={`${librarySidebar.addPlaylistPlus} fa fa-plus`}></div>}
                        </div>

                        <div className={librarySidebar.collection}>
                            {is584OrLarger && <div id={librarySidebar.hidden} className={librarySidebar.collectionHeadings}>
                                <p>Title</p>
                                <p>Date Added</p>
                            </div>}

                            <div className={librarySidebar.userPlaylists}>  {/** Playlists **/}
                                {Object.values(userPlaylists).map(playlist => (
                                    <div key={playlist._id} className={librarySidebar.item}>
                                        <div className={librarySidebar.mainInfo}>
                                            <img src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="playlistPhoto"/>
                                            <div>
                                                {!isMobileView && <p className={librarySidebar.narrowMedia}>{playlist.title}</p>}
                                                {!isMobileView && <p className={librarySidebar.narrowMedia}>Playlist</p>}
                                            </div>
                                        </div>
                                        {is584OrLarger && <p className={librarySidebar.dateAdded}>{convertTimestampToFormattedDate(playlist.createdAt)}</p>}
                                    </div>
                                ))}

                                {Object.values(userAlbums).map(album => (
                                    <div key={album._id} className={librarySidebar.item}>  {/** Albums **/}
                                        <div className={librarySidebar.mainInfo}>
                                            <img src={album.image} alt="AlbumPhoto"/>
                                            <div>
                                                {!isMobileView && <p className={librarySidebar.narrowMedia}>{album.title}</p>}
                                                {!isMobileView && <p className={librarySidebar.narrowMedia}>Album</p>}
                                            </div>
                                        </div>
                                        {is584OrLarger && <p className={librarySidebar.dateAdded}>{convertTimestampToFormattedDate(album.updatedAt)}</p>}
                                    </div>
                                ))}

                                {Object.values(userArtists).map(artist => (
                                    <div key={artist._id} className={librarySidebar.item}>  {/** Artists **/}
                                        <div className={librarySidebar.mainInfo}>
                                            <img src={artist.aboutImage} alt="ArtistPhoto"/>
                                            <div>
                                                {!isMobileView && <p className={librarySidebar.narrowMedia}>{artist.name}</p>}
                                                {!isMobileView && <p className={librarySidebar.narrowMedia}>Artist</p>}
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
        <div className={librarySidebar.resizebar} onMouseDown={handleMouseDown}></div> {/* attach handleMouseDown to resizebar div */}
        </>
    );
};
