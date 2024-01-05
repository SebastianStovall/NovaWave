import { useRef, useEffect } from "react"
import styles from '../../components/LibrarySidebar/librarySidebar.module.css'

export function Test() {
    const refBox = useRef<HTMLDivElement | null>(null)
    const refRight = useRef<HTMLDivElement | null>(null)
    const refLeft = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const resizeableElement = refBox.current
        const styles = window.getComputedStyle(resizeableElement!)
        let width = parseInt(styles.width, 10) // 100px --> 100

        let xCord = 0;

        (resizeableElement!).style.right = '240px';  //! Set the Initial Value of the Sidebar here

        //RIGHT
        const onMouseMoveRightResize = (e: MouseEvent) => {
            const dx = e.clientX - xCord;
            xCord = e.clientX;
            width = width + dx;
            if(resizeableElement) resizeableElement.style.width = `${width}px`
        }
        const onMouseUpRightResize = (e: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveRightResize)
        }
        const onMouseDownRightResize = (e: MouseEvent) => {
            xCord = e.clientX;
            if(resizeableElement) resizeableElement.style.left = styles.left;
            if(resizeableElement) resizeableElement.style.right = '';
            document.addEventListener('mousemove', onMouseMoveRightResize)
            document.addEventListener('mouseup', onMouseUpRightResize)
        }


        //LEFT
        const onMouseMoveLeftResize = (e: MouseEvent) => {
            const dx = e.clientX - xCord;
            xCord = e.clientX;
            width = width - dx;
            if(resizeableElement) resizeableElement.style.width = `${width}px`
        }
        const onMouseUpLeftResize = (e: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveLeftResize)
        }
        const onMouseDownLeftResize = (e: MouseEvent) => {
            xCord = e.clientX;
            if(resizeableElement) resizeableElement.style.right = styles.right;
            if(resizeableElement) resizeableElement.style.left = '';
            document.addEventListener('mousemove', onMouseMoveLeftResize)
            document.addEventListener('mouseup', onMouseUpLeftResize)
        }


        // Mouse Down Event Listener
        const resizerRight = refRight.current;
        resizerRight?.addEventListener('mousedown', onMouseDownRightResize)

        const resizerLeft = refLeft.current;
        resizerLeft?.addEventListener('mousedown', onMouseDownLeftResize)

        return () => {
            resizerRight?.removeEventListener('mousedown', onMouseDownRightResize)
            resizerLeft?.removeEventListener('mousedown', onMouseDownRightResize)
        }

    }, [])

    return (
        <>
            <div className={styles.resizableSidebarContainer}>
                <div ref={refBox} className={styles.resizableSidebar}> {/* inital width of container contained in state, but changed with events */}

                    {/* //* --- SIDEBAR CONTENT BEGIN --- */}

                    <div className={styles.topNav}>
                        <ul>
                            <li>
                                <a href="/">
                                    <span className="fa fa-home"></span>
                                    <span id={styles.narrowMedia} className={refBox.current?.style.width === '80px' ? `${styles.narrowSpan}` : ``}>Home</span>
                                </a>
                            </li>

                            <li>
                                <a href="/">
                                    <span className="fa fa-search"></span>
                                    <span id={styles.narrowMedia} className={refBox.current?.style.width === '80px' ? `${styles.narrowSpan}` : ``}>Search</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div id={refBox.current?.style.width === '80px' ? `${styles.hideMainPadding}` : ''} className={styles.main}>
                        <div className={styles.yourLibrary}>
                            <a href="/">
                                <span id={refBox.current?.style.width === '80px' ? `${styles.hideBookMargin}` : `${styles.hideBookMar}`} className="fa fa-book"></span>
                                <span id={styles.narrowMedia} className={refBox.current?.style.width === '80px' ? `${styles.narrowSpan}` : `${styles.narrowMedia}`}>Your Library</span>
                            </a>
                            {!(refBox.current?.style.width === '80px') && <div id={styles.narrowMedia} className={`${styles.addPlaylistPlus} fa fa-plus`}></div>}
                        </div>

                        <div className={styles.collection}>
                            { refBox.current?.style.width && parseInt(((refBox.current?.style.width).match(/\d+/)!)[0], 10) >= 584 && <div id={styles.hidden} className={styles.collectionHeadings}>
                                <p>Title</p>
                                <p>Date Added</p>
                            </div>}

                            {/* <div className={styles.userPlaylists}>
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
                            </div> */}

                        </div>
                    </div>

                    {/* //* --- SIDEBAR CONTENT END --- */}

                </div>
            </div>
        <div ref={refRight} className={styles.resizebar} ></div> {/* attach handleMouseDown to resizebar div */}
        </>
    )
}
