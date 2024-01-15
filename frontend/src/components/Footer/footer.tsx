import React from "react";
import styles from "./footer.module.css";
import { NowPlayingButton } from "../UI/nowPlayingButton/nowPlayingButton";
import { useAppSelector } from "../../hooks";

export const Footer: React.FC = () => {
  const user = useAppSelector((state) => state.session.user)

  return (
    <div className={styles.footer} style={{background: `${user ? '#000000' : 'linear-gradient(to right, #ae2896, #509bf5)'}`, backgroundSize: `${user ? 'auto' : '300%'}`}}>
      { user ?
        <>
          <div>SONG PIC AND NAME</div>
          <div>MEDIA_PLAYER</div>
          <div>
            <NowPlayingButton />
          </div>
        </>
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
