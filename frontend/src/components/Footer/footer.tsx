import React, { useState, useRef, useEffect } from "react";
import styles from "./footer.module.css";
import { NowPlayingButton } from "../UI/nowPlayingButton/nowPlayingButton";

// DISPATCH + App Selector
import { useAppDispatch } from "../../hooks";
import { useAppSelector } from "../../hooks";

// SLIDER
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// REDUCER ACTIONS
import { setPlay, setCurrentSong, setSongList } from "../../store/player/player";

export const Footer: React.FC = () => {
  console.log(" ------------------ FOOTER RE-RENDER ------------- ");
  const user = useAppSelector((state) => state.session.user);

  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  const songList = useAppSelector((state) => state.player.songList);
  const play = useAppSelector((state) => state.player.play);
  const currentSong = useAppSelector((state) => state.player.currentSong);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number | number[]>(0.15);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const randomIndex = Math.floor(Math.random() * songList.length);

  const [isHandleHovered, setIsHandleHovered] = useState(false);

  console.log("PLAY STATE ----> ", play)

  useEffect(() => {
    // Play/Pause current audio depending if a song is playing

    // if (currentSong && audioRef.current) { // TODO ---> THIS CODE SNIPPET CAUSES PROBLEMS, its supposed to play song automatically when refreshing page i think
    //   audioRef.current.play();
    //   dispatch(setPlay(true));
    // }

    if (!currentSong && audioRef.current) {
      audioRef.current.pause();
      dispatch(setPlay(false));
    }

    if (!currentSong) {
      setCurrentSongIndex(-1);
    } else {
      setCurrentSongIndex(
        songList.map((songMap) => songMap._id).indexOf(currentSong._id)
      );
    }

    const localAudio = localStorage.getItem('novawave-volume') // set volume

    setTimeout(() => {
      if (localAudio && audioRef.current) {
        audioRef.current.volume = Number(localAudio)
        setVolume( Number(localAudio) )
      }
    }, 150)

  }, [currentSong, dispatch, songList]);

  useEffect(() => {
    if(repeat && audioRef.current) { // if repeat is ACTIVE, loop current song
      audioRef.current.loop = true
    }

    if (!repeat && audioRef.current) { // if repeat is NOT active, turn audio loop OFF
      audioRef.current.loop = false
    }

    if (currentTime === duration && !repeat && !shuffle) { // go to NEXT song if repeat and shuffle are NOT active
      setCurrentSong(songList[currentSongIndex + 1] || songList[0])
    }

    if (currentTime === duration && shuffle && !repeat) { // if shuffle is ACTIVE, go to RANDOM index
      setCurrentSong(songList[randomIndex])
    }

    const handleAsyncPlay = async () => { //! DOM EXCEPTION ERROR FROM THIS FUNCTION CALL
      if(audioRef.current) {
        await audioRef.current.play()
      }
    }

    if (play === false && audioRef.current) {
      audioRef.current.pause()
    }

    if (play === true) {
      handleAsyncPlay()
    }


  }, [repeat, currentTime, play, shuffle, currentSongIndex, duration, randomIndex, songList]);

  const handlePlay = async () => { // play song when user hits play button
    if(audioRef.current) {
      await audioRef.current.play()
      dispatch(setPlay(true))
    }
  }

  const handlePause = () => { // pause button when user hits pause button
    if(audioRef.current) {
      audioRef.current.pause()
      dispatch(setPlay(false))
    }
  }

  const handleBack = () => { // go back one song when user hits the back button in media player
    if (currentTime === duration && shuffle) {
      setCurrentSong(songList[randomIndex])
    } else {
      setCurrentSong(songList[currentSongIndex - 1] || songList[songList.length - 1])
    }
  }

  const handleSkip = () => { // go forward one song when user hits the skip button in media player
    if (shuffle) {
      setCurrentSong(songList[randomIndex])
    } else {
      setCurrentSong(songList[currentSongIndex + 1] || songList[0])
    }
  }

  const handleVolume = (value: number | number[]) => {
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

  const handleTimeUpdate = () => {
    if(audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleCurrentTime = (e: number) => {
    setCurrentTime(e)
    if(audioRef.current) {
      audioRef.current.currentTime = e
    }
  }

  const handleRepeat = () => {
    if (!repeat) {
      setRepeat(true)
    } else {
      setRepeat(false)
    }
  }

  const handleShuffle = () => {
    if (!shuffle) {
      setShuffle(true)
    } else {
      setShuffle(false)
    }
  }

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
            onTimeUpdate={handleTimeUpdate}
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
              <i className="far fa-heart"></i>
            </div>
          </div>

          <div className={styles.progressController}>
            <div className={styles.controlButtons}>
              <i id={ shuffle ? `${styles.shuffleActive}` : `${styles.shuffleInactive}` } className="fas fa-random" onClick={handleShuffle}></i>
              <i className="fas fa-step-backward" onClick={handleBack}></i>

              { !play && <div className={`fas fa-play ${styles.playPause}`} onClick={handlePlay}></div> }
              { play && <div className={`fas fa-pause ${styles.playPause}`} onClick={handlePause}></div> }

              <i className="fas fa-step-forward" onClick={handleSkip}></i>
              <i id={ repeat ? `${styles.repeatButtonActive}` : `${styles.repeatButtonInactive}` } className={`fas fa-undo-alt`} onClick={handleRepeat}></i>
            </div>
            <div className={styles.progressContainer}>
              <span>0:49</span>
              <div className={styles.progressBar}>
                <div className={styles.progress}></div>
              </div>
              <span>3:15</span>
            </div>
          </div>

          <div className={styles.otherFeatures}>
            <NowPlayingButton />
            <div className={styles.volumeBar}
            onMouseEnter={() => setIsHandleHovered(true)}
            onMouseLeave={() => setIsHandleHovered(false)}
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
                  trackStyle={{ backgroundColor: '#26f7fd' }}
                  railStyle={{ backgroundColor: '#999' }}
                  handleStyle={{
                    backgroundColor: isHandleHovered ? 'white' : 'transparent',
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
          <button>Sign up Free</button>
        </>
      )}
    </div>
  );
};
