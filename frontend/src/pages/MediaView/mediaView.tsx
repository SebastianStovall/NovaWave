import React, { useEffect, useState } from 'react'
import { changeGradient, changeMediaInfo } from '../../store/header/header'
import { useMediaViewResize } from '../../hooks/useMediaViewResize'
import { usePalette } from 'react-palette'
import { hexToRgb } from '../../utils/gradientOverlayUtils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { updateCurrentMedia, addMediaToRecentlyViewed } from '../../store/media/media'
import { useLocation } from 'react-router-dom'
import styles from './mediaView.module.css'

import { setPlay, setCurrentSong, setSongList } from '../../store/player/player'


export const MediaView: React.FC = () => {
    const location = useLocation();
    const mediaType = location.pathname.split('/')[1];
    const mediaId = location.pathname.split('/')[2];

    const dispatch = useAppDispatch();
    const currentAlbumMedia: any = useAppSelector((state) => state.media.albumData);
    const currentPlaylistMedia: any = useAppSelector((state) => state.media.playlistData);
    const isLoading: boolean = useAppSelector((state) => state.media.isLoading)
    const user: any = useAppSelector((state) => state.session.user);
    const { data } = usePalette(mediaType === 'album' ? (currentAlbumMedia !== null ? currentAlbumMedia.image : '') : 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/liked-songs-640.png');

    //* Audio Related
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const play: any = useAppSelector((state) => state.player.play);
    const currentSong: any = useAppSelector((state) => state.player.currentSong);
    const songList: any = useAppSelector((state) => state.player.songList);

    useEffect(() => {
        let mediaInfo = {mediaType, mediaId}
        if(mediaInfo.mediaType === 'collection') {
            mediaInfo.mediaType = 'playlist'
        }
        dispatch(addMediaToRecentlyViewed(mediaInfo))
        dispatch(updateCurrentMedia(mediaInfo))
    }, [dispatch, location.pathname, mediaId, mediaType])

    useEffect(() => {
        dispatch(changeMediaInfo(mediaType === 'album' ? currentAlbumMedia?.title : currentPlaylistMedia?.title ))
        dispatch(changeGradient(`${hexToRgb(data.muted)}`))
    }, [dispatch, currentPlaylistMedia, currentAlbumMedia, data.muted, mediaType])

    const dependencies = [dispatch, data.muted, location.pathname, mediaId, mediaType]
    useMediaViewResize(dependencies);

    if(isLoading) {
        return <p>...Loading</p>
    }

    console.log("RE-RENDER")


    const handlePlayFromStart = () => {
        if(play === true) { // If already playing, then pause
            dispatch(setPlay(false))
            return
        }

        if(mediaType === 'album') {
            const indexOfCurrentSongInsideMedia = currentAlbumMedia.tracks.findIndex((track: any) => track._id === currentSong._id)

            if(indexOfCurrentSongInsideMedia === -1) { // if current song is NOT in the album we are trying to play, we will play album from the start
                dispatch(setSongList(currentAlbumMedia.tracks))
                dispatch(setCurrentSong(currentAlbumMedia.tracks[0]))
                dispatch(setPlay(true))
            } else {
                dispatch(setSongList(currentAlbumMedia.tracks))
                dispatch(setCurrentSong(currentAlbumMedia.tracks[indexOfCurrentSongInsideMedia]))
                dispatch(setPlay(true))
            }

            // console.log("SONG LIST ----------------->", songList)
            // console.log("CURRENT SONG ----------------->", currentSong)
            // console.log("PLAY STATE ----------------->", play)
        } else {
            console.log("WE ARE LOOKING AT A PLAYLIST")
        }
    }

    function handlePlayFromTrackNumber(index: number) {
        dispatch(setSongList(currentAlbumMedia.tracks))
        dispatch(setCurrentSong(currentAlbumMedia.tracks[index]))
        dispatch(setPlay(true))
    }

    return (
        <div className={styles.mediaView} style={{background: `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), rgba(${hexToRgb(data.muted)}, 1)`}}>

            <div className={styles.mediaContent}>
                <div className={styles.topCover}>
                    <img className={styles.coverImg} src={mediaType === 'album' ? currentAlbumMedia?.image : 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/liked-songs-640.png'} alt='media-cover' />
                </div>
                <div className={styles.topCoverInfo}>
                    <div className={styles.type}>{mediaType === 'album' ? 'Album' : 'Playlist'}</div>
                    <div className={styles.title}>
                    {mediaType === 'album' ? currentAlbumMedia?.title : 'Liked Songs'}
                    </div>
                    <div className={styles.stats}>
                        <img src='https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/%24B-ABOUT-Artist-1.jfif' width='24px' height='24px' alt='artist/owner' />
                        <span>{mediaType === 'album' ? currentAlbumMedia.artistName : user?.username}</span>
                        <span>{mediaType === 'album' ? `• ${currentAlbumMedia.yearReleased}` : ''}</span>
                        <span>{mediaType === 'album' ? `• ${currentAlbumMedia.tracks.length} songs` : `• ${currentPlaylistMedia?.tracks.length} songs`} •</span>
                        <span>{mediaType === 'album' ? currentAlbumMedia.length : `${currentPlaylistMedia?.length}`}</span>
                    </div>
                </div>
            </div>

            {/* style={{background: `linear-gradient(rgba(0,0,0,.6) 0,rgba(18,18,18,1) 35%),rgba(${hexToRgb(data.muted)}, 1)`}} */}
            <div className={styles.songsContainer} style={{background: `linear-gradient(rgba(0,0,0,.6) 0,rgba(18,18,18,1) 240px),rgba(${hexToRgb(data.muted)}, 1)`}}>
                <div className={styles.controlButtons}>
                    <div className={styles.leftButtons}>
                        <div className={styles.resumeAndPause} onClick={handlePlayFromStart}>
                            <div className={`${ (play && currentSong.album === mediaId) ? `fas fa-pause` : `fas fa-play`} ${styles.playPause}` }></div>
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

                    {/* If viewing an album */}
                    {mediaType === 'album' ? ( currentAlbumMedia.tracks.map((track: any, index: number) => (
                        <div
                        className={`${styles.gridItem}`}
                        key={track._id}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* // TODO ============================================================ */}

                            {
                            hoveredIndex !== index ?
                                <div
                                    id={currentSong._id === track._id ? styles.activeStyingsHovered : styles.trackNumber}
                                >
                                    {currentSong._id !== track._id ? index + 1 : (play ? '\u2223 \u2223' : index + 1)}
                                </div>
                                :

                                currentSong._id === track._id ? <div id={styles.togglePlay} onClick={() => play === true ? dispatch(setPlay(false)) : dispatch(setPlay(true))}>{play ? '\u2223 \u2223' : `\u25B6`}</div> : <div id={styles.togglePlayGrey} onClick={() => handlePlayFromTrackNumber(index)} >{`\u25B6`}</div>
                            }

                            {/* // TODO ============================================================ */}
                            <div className={styles.song}>
                                <div>
                                    {/* song active = blue title else normal title*/}
                                    <p id={currentSong._id === track._id ? styles.activeTitleText : ''}>{track.title}</p>
                                    <p>{track.artistName}</p>
                                </div>
                                <i className="fa fa-heart-o"></i>
                            </div>
                            <div>
                                <p>{track.length}</p>
                                <div className={styles.moreOptionsflexGrid}>
                                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                                </div>
                            </div>
                        </div> )) ) : null
                    }

                    {/* If viewing a playlist */}
                    {mediaType === 'playlist' ? ( currentPlaylistMedia.tracks.map((track: any, index: number) => (
                        <div className={styles.gridItem} key={track._id}>
                            <div>{index + 1}</div>
                            <div className={styles.song}>
                                <div>
                                    <p>{track.title}</p>
                                    <p>{track.artistName}</p>
                                </div>
                                <i className="fa fa-heart-o"></i>
                            </div>
                            <div>
                                <p>{track.length}</p>
                                <div className={styles.moreOptionsflexGrid}>
                                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                                </div>
                            </div>
                        </div> )) ) : null
                    }
                </div>
            </div>

        </div>
    )
}
