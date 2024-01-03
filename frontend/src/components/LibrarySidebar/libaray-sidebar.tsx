import React, {useEffect, useState} from "react";
import librarySidebar from "./library-sidebar.module.css";
import { useSidebarResize } from "../../hooks/useSidebarResize";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserPlaylistsThunk } from "../../store/playlists";
import { convertTimestampToFormattedDate } from "../../utils/dateUtils";

export const LibrarySidebar: React.FC = () => {
    const { sidebarWidth, handleMouseDown } = useSidebarResize("left");
    const [loading, setLoading] = useState<Boolean>(true);
    const dispatch = useAppDispatch()
    const userPlaylists = useAppSelector(state => Object.values(state.playlists))

    const isMobileView = sidebarWidth === 80;
    const is584OrLarger = sidebarWidth >= 584;

    useEffect(() => {
        dispatch(getUserPlaylistsThunk()).then(_ => setLoading(false))
    }, [dispatch])

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

                            <div className={librarySidebar.userPlaylists}>
                                {userPlaylists.map(playlist => (
                                    <div key={playlist._id} className={librarySidebar.playlistItem}>
                                        <div className={librarySidebar.plMainInfo}>
                                            <img src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="playlistPhoto"/>
                                            <div>
                                                {!isMobileView && <p className={librarySidebar.narrowMedia}>{playlist.title}</p>}
                                                {!isMobileView && <p className={librarySidebar.narrowMedia}>Playlist</p>}
                                            </div>
                                        </div>
                                        {is584OrLarger && <p className={librarySidebar.dateAdded}>{convertTimestampToFormattedDate(playlist.createdAt)}</p>}
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
