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
  console.log("FOOTER RE-RENDER");
  const user = useAppSelector((state) => state.session.user);

  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  const songList = useAppSelector((state) => state.player.songList);
  const play = useAppSelector((state) => state.player.play);
  const currentSong = useAppSelector((state) => state.player.currentSong);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(null);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);

  const randomIndex = Math.floor(Math.random() * songList.length);

  useEffect(() => {
    // Play/Pause current audio depending if a song is playing
    setTimeout(() => {
      if (currentSong && audioRef.current) {
        audioRef.current.play();
        dispatch(setPlay(true));
      }
    }, 1000);

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

    // TODO ----- AUDIO IN LOCAL STATE (using REDUX PERSIST)
    // const localAudio = localStorage.getItem('tritone-volume')
    // if (localAudio) {
    //   audioRef.current.volume = localAudio
    //   setVolume(localAudio)
    // }
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

    const handleExternalPlay = async () => {
      if(audioRef.current) {
        await audioRef.current.play()
      }
    }

    if (play === false && audioRef.current) {
      audioRef.current.pause()
    }

    if (play === true) {
      handleExternalPlay()
    }


  }, [repeat, currentTime, play, shuffle, currentSongIndex, duration, randomIndex, songList]);

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
          <div className={styles.songBar}>
            <div className={styles.songInfo}>
              <div className={styles.imageContainer}>
                <img
                  src="https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.jfif"
                  alt="musicPlayerCurrentlyPlayingImage"
                />
              </div>
              <div>
                <p className={styles.title}>Bloody 98</p>
                <p className={styles.artist}>$uicideboy$</p>
              </div>
            </div>

            <div className={styles.icons}>
              <i className="far fa-heart"></i>
            </div>
          </div>

          <div className={styles.progressController}>
            <div className={styles.controlButtons}>
              <i className="fas fa-random"></i>
              <i className="fas fa-step-backward"></i>
              <div className={`fas fa-play ${styles.playPause}`}></div>
              <i className="fas fa-step-forward"></i>
              <i className="fas fa-undo-alt"></i>
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
            <div className={styles.volumeBar}>
              <i className="fas fa-volume-down"></i>
              <div className={styles.progressBar}>
                <div className={styles.progress}></div>
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
