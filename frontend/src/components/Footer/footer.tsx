import React from "react";
import styles from "./footer.module.css";
import { NowPlayingButton } from "../UI/nowPlayingButton/nowPlayingButton";

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div>SONG PIC AND NAME</div>
      <div>MEDIA_PLAYER</div>
      <div>
        <NowPlayingButton />
      </div>
    </div>
  );
};
