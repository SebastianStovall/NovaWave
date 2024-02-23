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
import { setPlay, setCurrentSong } from "../../store/player/player";

export const Footer: React.FC = () => {
  const user = useAppSelector((state) => state.session.user);

  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  const songList = useAppSelector((state) => state.player.songList);
  const play = useAppSelector((state) => state.player.play);
  const currentSong = useAppSelector((state) => state.player.currentSong);

  const [currentTime, setCurrentTime] = useState<number | number[]>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number | number[]>(0.15);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const randomIndex = Math.floor(Math.random() * songList.length);

  const [volumeHovered, setVolumeHovered] = useState(false);
  const [progressBarHovered, setProgressBarHovered] = useState(false);

  // console.log(" ------------------ FOOTER RE-RENDER ------------- ");
  // console.log("PLAY STATE ----> ", play)

  useEffect(() => {
    //! If the user doesnt not interact with the page before this executes, will receive an autoplay error ----> play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
    if (play && currentSong && songList.length > 0 && audioRef.current) {
      if(audioRef.current && audioRef.current.paused) {
        audioRef.current.play();
      }
    }

    if ( (play === false || !currentSong || songList.length === 0) && audioRef.current) {
      if(!audioRef.current.paused) {
        audioRef.current.pause();
      }
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

  }, [currentSong, dispatch, songList, play]);

  useEffect(() => { //* This useEffect fires if --->     1.) user changes song      2.) song ends      3.) user puts on shuffle     4.) user puts on loop
    const audioElement = audioRef.current;

    if(repeat && audioElement) {
      audioElement.loop = true
    }

    if (!repeat && audioElement) {
      audioElement.loop = false
    }

    function handleSongEnd() {
      if (!repeat && !shuffle) { // go to next song when song ends (if shuffle and repeat are NOT active)
        dispatch(setCurrentSong(songList[currentSongIndex + 1] || songList[0]))
      } else {
        dispatch(setCurrentSong(songList[randomIndex])) // if shuffle on, go to random song
      }
    }

    if (play === true && audioElement && currentSong) { // play if needed
      if(audioElement && audioElement.paused) {
        audioElement.play()
      }
    }

    if (play === false && audioElement) {  // pause if needed
      if(!audioElement.paused) {
        audioElement.pause()
      }
    }

    audioElement?.addEventListener('ended', handleSongEnd); //*  detect when a video/audio input has ended, so you can safely go to the next song without having to worry about the async behavior of audioRef.play()

    return () => {
      audioElement?.removeEventListener('ended', handleSongEnd);
    };

  }, [repeat, currentTime, play, shuffle, currentSongIndex, duration, randomIndex, songList, currentSong, dispatch]);

  const handlePlay = async () => { //! -- IMPORTANT -- ONLY ATTEMPT TO PLAY IF A CURRENT SONG IS ACTIVE, OTHERWISE YOU WILL GET A DOM ERROR SINCE ITS ATTEMPTING TO PLAY PLAYBACK OF UNDEFINED
    if(audioRef.current) {
      if(audioRef.current.paused) {
        audioRef.current.play()
      }
      if(play === false) {
        dispatch(setPlay(true))
      }
    }
  }

  const handlePause = () => { // pause button when user hits pause button
    if(audioRef.current) {
      if(!audioRef.current.paused) {
        audioRef.current.pause()
      }
      if(play === true) {
        dispatch(setPlay(false))
      }
    }
  }

  const handleBack = () => { // go back one song when user hits the back button in media player
    if (currentTime === duration && shuffle) {
      dispatch(setCurrentSong(songList[randomIndex]))
    } else {
      dispatch(setCurrentSong(songList[currentSongIndex - 1] || songList[songList.length - 1]))
    }
  }

  const handleSkip = () => { // go forward one song when user hits the skip button in media player
    if (shuffle) {
      dispatch(setCurrentSong(songList[randomIndex]))
    } else {
      dispatch(setCurrentSong(songList[currentSongIndex + 1] || songList[0]))
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

  const handleCurrentTime = (value: number | number[]) => {
    setCurrentTime(value)
    if(audioRef.current) {
      if(Array.isArray(value)) {
        audioRef.current.currentTime = value[0]
      } else {
        audioRef.current.currentTime = value
      }
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

  function formatTimestamp(currentTime: number) {
    // Calculate the elapsed time in seconds
    const elapsedMinutes = Math.floor(currentTime / 60);
    const elapsedSeconds = Math.floor(currentTime % 60);

    // Format the timestamp
    const formattedTimestamp = `${elapsedMinutes}:${elapsedSeconds < 10 ? '0' : ''}${elapsedSeconds}`;
    return formattedTimestamp;
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
          <button>Sign up Free</button>
        </>
      )}
    </div>
  );
};
