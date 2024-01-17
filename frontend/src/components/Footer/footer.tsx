import React from "react";
import styles from "./footer.module.css";
import { NowPlayingButton } from "../UI/nowPlayingButton/nowPlayingButton";
import { useAppSelector } from "../../hooks";

export const Footer: React.FC = () => {
  const user = useAppSelector((state) => state.session.user)

  return (
    <div className={styles.footer} style={{background: `${user ? '#000000' : 'linear-gradient(to right, #ae2896, #509bf5)'}`, backgroundSize: `${user ? 'auto' : '300%'}`}}>
      { user ?
        <div className={styles.musicPlayer}>
          <div className={styles.songBar}>
            <div className={styles.songInfo}>
              <div className={styles.imageContainer}>
                <img src="https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.jfif" alt="musicPlayerCurrentlyPlayingImage" />
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
        :
        <>
          <div className={styles.previewText}>
            <h6>Preview of NovaWave</h6>
            <p>Sign up to start listening to your favorite songs.</p>
          </div>
            <button>Sign up Free</button>
        </>
      }
    </div>
  );
};
