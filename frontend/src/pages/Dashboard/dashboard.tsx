import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { usePalette } from "react-palette";
import {
  hexToRgb,
  imageUrls,
  handleMouseEnter,
  handleMouseLeave,
} from "../../utils/gradientOverlayUtils";
import { useDashboardResizeStylings } from "../../hooks/useDashboardResizeStylings";

import { useAppDispatch } from "../../hooks";
import { changeGradient, changeMediaInfo } from "../../store/header/header";

export const Dashboard: React.FC = () => {
  useDashboardResizeStylings();
  const gradientOverlay: HTMLElement | null = document.querySelector(
    ".dashboard_gradientOverlayForTransition__AEA6r"
  ) as HTMLElement;

  const [albumData, setAlbumData] = useState<any>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  // import { useHistory } from 'react-router-dom';
  // const history = useHistory();
  // <div onClick={() => history.push('/other-page')}>

  const { data } = usePalette(
    /* { data, loading, error } */ /* //! Extracts Prominent Colors from an Image */
    hoveredIndex !== null ? imageUrls[hoveredIndex] : imageUrls[0]
  );

  const grabRecommendedPlaylists = async () => {
    try {
      const response = await fetch("/api/tracks/albums");
      if (response.ok) {
        const albums = await response.json();
        setAlbumData(albums);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    changeGradient("33, 17, 95"); // liked songs playlist purple
    changeMediaInfo('')
  }, [dispatch]);

  useEffect(() => {
    async function execute() {
      await grabRecommendedPlaylists();
    }
    execute();
  }, []);

  return (
    <div className={styles.dashboard}>
      <div
        className={
          styles.gradientOverlayForTransition
        } /* ACTS AS '.dashboard::before' for Gradient Transition */
        style={{
          background: `linear-gradient(to bottom, rgba(${hexToRgb(
            data.darkVibrant
          )}, 0.8) 64px, #121212 300px, #121212)`,
        }}
      ></div>

      <h1 className={styles.welcomeMessage}>Good evening</h1>
      <div className={styles.quickplayPlaylists}>
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            onMouseEnter={() =>
              handleMouseEnter(index, setHoveredIndex, gradientOverlay)
            }
            onMouseLeave={() => handleMouseLeave(gradientOverlay)}
          >
            <img src={imageUrls[index]} alt="album_photo" />
            <div>
              <p>Name of Song</p>
              <div>
                <span>&#9654;</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className={styles.recommended}>Recommended For Today</h2>
      <div className={styles.mainGridSection}>
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index}>
            <img
              src={albumData && albumData[index].image}
              alt="playlist_album_photo"
            />
            <div className={styles.playButton}>
              <span className="fa fa-play" id={styles.playFa}></span>
            </div>
            <h4>{albumData && albumData[index].artistName}</h4>
            <p>{albumData && albumData[index].title}</p>
          </div>
        ))}
      </div>

      {/* <audio controls>
                <source src="https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+KILLKA.mp3" type="audio/mp3" />
            </audio> */}
    </div>
  );
};
