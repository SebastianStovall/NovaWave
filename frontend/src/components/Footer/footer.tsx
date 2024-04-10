import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./footer.module.css";
import mediaViewStyles from '../../pages/MediaView/mediaView.module.css'
import { NowPlayingButton } from "../UI/nowPlayingButton/nowPlayingButton";

// DISPATCH + App Selector
import { useAppDispatch } from "../../hooks";
import { useAppSelector } from "../../hooks";

// SLIDER
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// REDUCER ACTIONS
import { setPlay, setCurrentSong } from "../../store/player/player";
import { updateCurrentMedia, getAllIdsInLikedSongs } from "../../store/media/media";

// Hooks
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

// Helper Functions
import {
  handlePlay,
  handlePause,
  handleBack,
  handleSkip,
  handleTimeUpdate,
  handleRepeat,
  handleShuffle,
  formatTimestamp
} from "../../utils/audio/audioPlayerHelpers";

import { isTargetSongInLikedSongs, handleFavoriteSong } from "../../utils/audio/likedSongsPlaylistHelpers";

export const Footer: React.FC = () => {
  const user: any = useAppSelector((state) => state.session.user);
  const navigate = useNavigate()

  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  // global audio state
  const songList = useAppSelector((state) => state.player.songList);
  const play = useAppSelector((state) => state.player.play);
  const currentSong: any = useAppSelector((state) => state.player.currentSong);

  // Local audio useState()
  const [currentTime, setCurrentTime] = useState<number | number[]>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number | number[]>(0.15);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const randomIndex = Math.floor(Math.random() * songList.length);

  const [volumeHovered, setVolumeHovered] = useState(false);
  const [progressBarHovered, setProgressBarHovered] = useState(false);


  // Local State UI
  const [likedSongsUpdated, setLikedSongsUpdated] = useState<boolean>(false)

  // Hook that handles the useEffect effects for audio player
  useAudioPlayer(
    play,
    currentSong,
    dispatch,
    songList,
    currentSongIndex,
    repeat,
    shuffle,
    audioRef,
    randomIndex,
    setCurrentSongIndex,
    setVolume,
    setCurrentSong
  )

// handle live time update on slider bar
const handleCurrentTime = ( value: number | number[] ) => {
  setCurrentTime(value)
  if(audioRef.current) {
      if(Array.isArray(value)) {
          audioRef.current.currentTime = value[0]
      } else {
          audioRef.current.currentTime = value
      }
  }
}

// handle volume change
const handleVolume = ( value: number | number[]) => {
  setVolume(value)
  localStorage.setItem('novawave-volume', value.toString())
  if(audioRef.current) {
      if(Array.isArray(value)) {
          audioRef.current.volume = value[0]
      } else {
          audioRef.current.volume = value
      }
  }
}


  // UI update when favoriting song in footer -----

    // media state slice
  const likedSongs: any = useAppSelector((state) => state.media.likedSongIds)
  const likedSongsLoading: boolean = useAppSelector((state) => state.media.likedSongsLoading)

    // location util help
  const location = useLocation();
  const mediaType = location.pathname.split('/')[1];
  const mediaId = location.pathname.split('/')[2];

  useEffect(() => { // hot refresh inside of liked songs media view page
    let mediaInfo = {mediaType, mediaId}
    if(mediaInfo.mediaType === 'collection') mediaInfo.mediaType = 'playlist'
    if(mediaInfo.mediaId === 'tracks' && user) mediaInfo.mediaId = user?.likedSongsPlaylistId

    if(mediaType === 'collection') { // if on liked songs page
      dispatch(updateCurrentMedia(mediaInfo))
    }
  }, [dispatch, location.pathname, mediaId, mediaType, user, likedSongsUpdated])

  useEffect(() => {
    if(user) {
      dispatch(getAllIdsInLikedSongs())
    }
  }, [dispatch, likedSongsUpdated, user]) // retreive new liked songs when adding/removing track for the new UI update

  useEffect(() => { // reset for subsequent UI updates
    if (likedSongsUpdated) {
      setLikedSongsUpdated(false);
    }
  }, [likedSongsUpdated]);

  if(user && likedSongsLoading) {
    return <div className={styles.footer}></div>
  }

  // -------------------------------------------------------------------------------------------------------------------------------


  return (
    <div
      className={styles.footer}
      style={{
        background: `${
          user ? "#000000" : "linear-gradient(to right, #ae2896, #509bf5)"
        }`,
        backgroundSize: `${user ? "auto" : "300%"}`,
      }}
    >
      {user ? (
        //! ---------------- MEDIA PLAYER WHEN SIGNED IN -------------------------------
        <div className={styles.musicPlayer}>

          { /* AUDIO PLAYER */ }
          <audio
            ref={audioRef}
            src={currentSong?.audio}
            onTimeUpdate={() => handleTimeUpdate(audioRef, setCurrentTime, setDuration)}
          />
          { /* AUDIO PLAYER */ }

          <div className={styles.songBar}>
            <div className={styles.songInfo}>
              <div className={styles.imageContainer}>
                <img
                  src={currentSong !== null ? currentSong.image : "https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.jfif"}
                  alt="musicPlayerCurrentlyPlayingImage"
                />
              </div>
              <div>
                <p className={styles.title}>{currentSong !== null ? currentSong.title : 'Bloody 98'}</p>
                <p className={styles.artist}>{currentSong !== null ? currentSong.artistName : '$uicideboy$'}</p>
              </div>
            </div>

            <div className={styles.icons}>
              <i
                className={ isTargetSongInLikedSongs(currentSong?._id, likedSongs) === true ? 'fa fa-heart' : 'fa fa-heart-o'}
                id={ isTargetSongInLikedSongs(currentSong?._id, likedSongs) === true ? mediaViewStyles.inLikedSongs : mediaViewStyles.notInLikedSongs}
                onClick={() => {
                  handleFavoriteSong(currentSong?._id, user.likedSongsPlaylistId, likedSongs)
                  setLikedSongsUpdated(true);
                }}
              >
              </i>
            </div>
          </div>

          <div className={styles.progressController}>
            <div className={styles.controlButtons}>
              <i id={ shuffle ? `${styles.shuffleActive}` : `${styles.shuffleInactive}` } className="fas fa-random" onClick={() => handleShuffle(shuffle, setShuffle)}></i>
              <i className="fas fa-step-backward" onClick={() => handleBack(currentTime, duration, shuffle, dispatch, setCurrentSong, songList, currentSongIndex, randomIndex)}></i>

              { !play && <div className={`fas fa-play ${styles.playPause}`} onClick={() => handlePlay(audioRef, dispatch, play, setPlay)}></div> }
              { play && <div className={`fas fa-pause ${styles.playPause}`} onClick={() => handlePause(audioRef, dispatch, play, setPlay)}></div> }

              <i className="fas fa-step-forward" onClick={() => handleSkip(shuffle, dispatch, setCurrentSong, songList, currentSongIndex, randomIndex)}></i>
              <i id={ repeat ? `${styles.repeatButtonActive}` : `${styles.repeatButtonInactive}` } className={`fas fa-undo-alt`} onClick={() => handleRepeat(repeat, setRepeat)}></i>
            </div>
            <div className={styles.progressContainer} >
            { currentSong && <span>{formatTimestamp(currentTime as number)}</span>}
              <div
                className={styles.progressBar}
                onMouseEnter={() => setProgressBarHovered(true)}
                onMouseLeave={() => setProgressBarHovered(false)}
              >
                <Slider
                  min={0}
                  max={duration || 0} // Ensure duration is always a number
                  step={0.1}
                  value={currentTime}
                  onChange={handleCurrentTime}
                  trackStyle={{ backgroundColor: progressBarHovered ? '#26f7fd' : '#ddd', height: 4 }}
                  railStyle={{ backgroundColor: '#4d4d4d', height: 4 }}
                  handleStyle={{ backgroundColor: progressBarHovered ? 'white' : 'transparent', border: 'none', opacity: 1, height: 14, width: 14 }}
                />
              </div>
              { currentSong && <span>{currentSong.length}</span>}
            </div>
          </div>

          <div className={styles.otherFeatures}>
            <NowPlayingButton />
            <div
              className={styles.volumeBar}
              onMouseEnter={() => setVolumeHovered(true)}
              onMouseLeave={() => setVolumeHovered(false)}
            >
              <i className="fas fa-volume-down"></i>
              <div className={styles.progressBar}>
                {/* Use the Slider component */}
                <Slider
                  min={0}
                  max={0.5}
                  step={0.01}
                  value={volume}
                  onChange={handleVolume}
                  trackStyle={{ backgroundColor: volumeHovered ? '#26f7fd' : '#ddd' }}
                  railStyle={{ backgroundColor: '#999' }}
                  handleStyle={{
                    backgroundColor: volumeHovered ? 'white' : 'transparent',
                    border: 'none',
                    opacity: 1,
                  }}
                />
              </div>
            </div>
            <i className="fas fa-compress"></i>
          </div>
        </div>
      ) : (
        //* ---------------- MEDIA PLAYER WHEN NOT SIGNED IN -------------------------------
        <>
          <div className={styles.previewText}>
            <h6>Preview of NovaWave</h6>
            <p>Sign up to start listening to your favorite songs.</p>
          </div>
          <button onClick={() => navigate('/login')}>Sign up Free</button>
        </>
      )}
    </div>
  );
};
