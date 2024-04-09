import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { usePalette } from 'react-palette'
import { useNavigate } from "react-router-dom";

// import { addMediaToRecentlyViewed } from '../../store/media/media'
import { updateCurrentMedia } from '../../store/media/media'
import { retreiveArtistInformation, retreiveArtistTopSongs } from '../../store/artist/artist'
import { changeMediaInfo } from '../../store/header/header'
import { changeGradient } from '../../store/header/header'

import { handlePlayFromStart, handlePlayFromTrackNumber } from '../../utils/audio/mediaViewHelpers'
import { setPlay } from '../../store/player/player'

import { hexToRgb } from '../../utils/gradientOverlayUtils'
import { addCommasToNumber } from '../../utils/audio/numberUtils'
import { AlbumDocument } from '../../../../backend/src/db/models/modelTypes';

import styles from './artistView.module.css'
import mediaViewStyles from '../MediaView/mediaView.module.css'
import dashboardStyles from '../Dashboard/dashboard.module.css'

export const ArtistView: React.FC = () => {
    const { artistId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const mediaType = location.pathname.split('/')[1];
    const mediaId = location.pathname.split('/')[2];

    // media state slice
    // const currentAlbumMedia: any = useAppSelector((state) => state.media.albumData);
    const currentPlaylistMedia: any = useAppSelector((state) => state.media.playlistData);
    const artistData: any = useAppSelector((state) => state.media.artistData);

    const dispatch = useAppDispatch()
    const { data } = usePalette(artistData !== null && artistData.bannerImage.length > 0 ? artistData.bannerImage : 'https://media.istockphoto.com/id/1133248464/photo/gray-abstract-background.jpg?s=612x612&w=0&k=20&c=NW-QBTklqJR8jRai5gPe6x5-f3QzZSmsMl3TYaJrL-4=');

    // player state slice
    const play: any = useAppSelector((state) => state.player.play);
    const currentSong: any = useAppSelector((state) => state.player.currentSong);
    interface Song { _id: string }

    // artist state slice
    const artistTopSongs: any = useAppSelector((state) => state.artist.artistTopSongs);
    const artist: any = useAppSelector((state) => state.artist.artist);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        let mediaInfo = {mediaType, mediaId}
        // dispatch(addMediaToRecentlyViewed(mediaInfo)) //TODO ---> THIS IS BROKEN....
        dispatch(updateCurrentMedia(mediaInfo))
    }, [dispatch, location.pathname, mediaId, mediaType])

    useEffect(() => {
        dispatch(retreiveArtistTopSongs(artistId))
        dispatch(retreiveArtistInformation(artistId))
    }, [dispatch, artistId])

    useEffect(() => {
        dispatch(changeMediaInfo(artistData?.name))
        dispatch(changeGradient(`${hexToRgb(data.vibrant)}`))
    }, [dispatch, data.vibrant, artistData])

    return (
        <div>
            <div className={styles.mediaContent} style={{backgroundImage: `url(${artistData?.bannerImage})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                {/* Artist name and monthly listners relative div here */}
                <div className={styles.coverBannerBackground}>
                    {/* USED FOR FADE IN AND OUT OF COVER IMAGE */}
                </div>
                <div className={styles.bannerArtistInfo}>
                    <h1>{artistData?.name}</h1>
                    <p>{addCommasToNumber(artistData?.monthlyListeners)} monthly listeners</p>
                </div>
            </div>

            <div className={styles.songsContainer} style={{background: `linear-gradient(rgba(0,0,0,.6) 0,rgba(18,18,18,1) 240px),rgba(${hexToRgb(data.vibrant)}, 1)`}}>
                <div className={mediaViewStyles.controlButtons}>
                    <div className={mediaViewStyles.leftButtons}>
                        <div className={mediaViewStyles.resumeAndPause} onClick={() => handlePlayFromStart({tracks: artistTopSongs}, currentPlaylistMedia, currentSong, mediaType, play, dispatch)}>
                            {/* //* should show play or pause depending if current song playing is part of that artist top songs */}
                            <div className={`${ (play && currentSong && artistTopSongs && artistTopSongs.some((song: Song) => song._id === currentSong._id)) ? `fas fa-pause` : `fas fa-play`} ${mediaViewStyles.playPause}` }></div>
                        </div>
                        <button className={styles.followButton}>
                            Follow
                        </button>
                        <div className={mediaViewStyles.moreOptions}>
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                        </div>
                    </div>
                </div>

                <h2 className={styles.artistHeading}>Popular</h2>

                <div className={mediaViewStyles.flexGrid}>
                    { artistTopSongs?.map((track: any, index: number) => (
                        <div
                        className={`${mediaViewStyles.gridItem}`}
                        key={track._id}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        >

                            {
                                //* When NOT hovering over audio track, but if track is queued VS not queued
                            hoveredIndex !== index ?
                                <div
                                    id={currentSong._id === track._id ? mediaViewStyles.activeStyingsHovered : mediaViewStyles.trackNumber}
                                >
                                    {currentSong._id !== track._id ? index + 1 : (play ? '\u2223 \u2223' : index + 1)}
                                </div>
                                :
                                currentSong._id === track._id ? <div id={mediaViewStyles.togglePlay} onClick={() => play === true ? dispatch(setPlay(false)) : dispatch(setPlay(true))}>{play ? '\u2223 \u2223' : `\u25B6`}</div> : <div id={mediaViewStyles.togglePlayGrey} onClick={() => handlePlayFromTrackNumber({tracks: artistTopSongs}, currentPlaylistMedia, mediaType, index, dispatch)} >{`\u25B6`}</div>
                                //* When hovering over audio, if track is queued VS not queued
                            }

                            <div className={mediaViewStyles.song}>
                                <img src={track.image} width='40px' height='40px' style={{borderRadius: '5px'}} alt='album-cover-img' />
                                <div className={styles.testThis}>
                                    <p id={currentSong._id === track._id ? mediaViewStyles.activeTitleText : ''} className={styles.songTitle}>{track.title}</p>
                                    <span aria-label="Explicit" className={styles.explicit}>E</span>
                                </div>
                                <span className={styles.viewCount} style={{marginLeft: 'auto', paddingLeft: '10px'}}>{addCommasToNumber(track.plays)}</span>
                                <i className="fa fa-heart-o" style={{marginLeft: 'auto', paddingLeft: '10px'}}></i>
                            </div>
                            <div>
                                <p>{track.length}</p>
                                <div className={mediaViewStyles.moreOptionsflexGrid}>
                                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                                </div>
                            </div>
                        </div> ))
                    }
                </div>

                <h2 className={styles.artistHeading} style={{marginTop: '60px'}}>Discography</h2>

                <div className={dashboardStyles.mainGridSection} style={{paddingLeft: '24px', paddingRight: '24px'}}>
                    {artist?.discography?.map((album: AlbumDocument, index: number) => (
                        <div key={index} onClick={(e) => navigate(`/album/${album._id}`)}>
                        <div>
                            <img
                                src={album.image as string}
                                alt="playlist_album_photo"
                            />
                        </div>
                        <div className={dashboardStyles.playButton}>
                            <span className="fa fa-play" id={dashboardStyles.playFa}></span>
                        </div>
                        <h4>{album.title}</h4>
                        <p className={dashboardStyles.artistClick}>{album.yearReleased} · {album.tracks.length > 1 ? 'Album' : 'Single'}</p>
                        </div>
                    ))}
                </div>

                <h2 className={styles.artistHeading} style={{marginTop: '60px'}}>About</h2>

                <div className={styles.aboutContainer}>
                    <button type='button' className={styles.aboutModalButton} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%), url(${artist?.aboutImage})`}}>
                        <div className={styles.modalTextContainer}>
                            <div className={styles.monthlyListeners}>{addCommasToNumber(artist?.monthlyListeners)} monthly listeners</div>
                            <div className={styles.bioText}>{artist?.description}</div>
                        </div>
                    </button>
                </div>

            </div>
        </div>

    )
}
