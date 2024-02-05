import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { usePalette } from "react-palette";
import { hexToRgb, handleMouseEnter, handleMouseLeave } from "../../utils/gradientOverlayUtils";
import { useDashboardResizeStylings } from "../../hooks/useDashboardResizeStylings";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeGradient, changeMediaInfo } from "../../store/header/header";
import { getQuickplayGridThunk } from "../../store/dashboard/dashboard";

import {ArtistDocument, AlbumDocument, PlaylistDocument} from '../../../../backend/src/db/models/modelTypes';
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [albumData, setAlbumData] = useState<any>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const userQuickplayGrid: (AlbumDocument | ArtistDocument | PlaylistDocument)[] = useAppSelector((state) => state.dashboard.quickplayGrid)
  const isLoading: boolean = useAppSelector((state) => state.dashboard.isLoading)

  const gradientOverlay: HTMLElement | null = document.querySelector(
    ".dashboard_gradientOverlayForTransition__AEA6r"
    ) as HTMLElement;


    useDashboardResizeStylings([dispatch]);
  const hoveredItem = hoveredIndex !== null ? userQuickplayGrid[hoveredIndex] : null
  const { data } = usePalette(
    /* { data, loading, error } */ /* //! Extracts Prominent Colors from an Image */
    hoveredIndex !== null && hoveredItem !== null ? ( 'image' in hoveredItem ? hoveredItem.image as string : 'aboutImage' in hoveredItem ? hoveredItem.aboutImage as string : 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/liked-songs-640.png' ) : 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/liked-songs-640.png'
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
    dispatch(changeGradient('33, 17, 95')); // liked songs playlist purple
    dispatch(changeMediaInfo(''));
    dispatch(getQuickplayGridThunk())
  }, [dispatch]);

  useEffect(() => {
    async function execute() {
      await grabRecommendedPlaylists();
    }
    execute();
  }, []);

  if(isLoading) {
    return <p>...Loading</p>
  }

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
        {userQuickplayGrid.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() =>
              handleMouseEnter(index, setHoveredIndex, gradientOverlay)
            }
            onMouseLeave={() => handleMouseLeave(gradientOverlay)}
            onClick={
              'image' in item ?
              () => navigate(`/album/${item._id}`) :
              'name' in item ?
              () => navigate(`/artist/${item._id}`) :
              index === 0 ?
              () => navigate(`/collection/tracks`) :
              () => navigate(`/playlist/${(item as any)._id}`)
            }
          >
            <div className={styles.imageContainer}>
              <img src={ 'image' in item ? item.image as string : 'aboutImage' in item ? item.aboutImage as string : 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/liked-songs-640.png'} alt="media_image" />
            </div>
            <div>
              <p>{ 'title' in item ? item.title as string : 'name' in item ? item.name as string : 'Liked Songs'}</p>
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
