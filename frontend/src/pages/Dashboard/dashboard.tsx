import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { usePalette } from "react-palette";
import { hexToRgb, handleMouseEnter, handleMouseLeave } from "../../utils/gradientOverlayUtils";
import { useDashboardResizeStylings } from "../../hooks/useDashboardResizeStylings";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeGradient, changeMediaInfo } from "../../store/header/header";
import { getQuickplayGridThunk, getGridInfo } from "../../store/dashboard/dashboard";

import {ArtistDocument, AlbumDocument, PlaylistDocument} from '../../../../backend/src/db/models/modelTypes';
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const userQuickplayGrid: (AlbumDocument | ArtistDocument | PlaylistDocument)[] = useAppSelector((state) => state.dashboard.quickplayGrid)
  const recommendedAlbums: AlbumDocument[] = useAppSelector((state) => state.dashboard.recommendedForToday)
  const popularArtists = useAppSelector((state) => state.dashboard.popularArtists)
  const isLoading: boolean = useAppSelector((state) => state.dashboard.isLoading)

  const gradientOverlay: HTMLElement | null = document.querySelector(
    ".dashboard_gradientOverlayForTransition__AEA6r"
    ) as HTMLElement;


  useDashboardResizeStylings(dispatch);
  const hoveredItem = hoveredIndex !== null ? userQuickplayGrid[hoveredIndex] : null
  const { data } = usePalette(
    /* { data, loading, error } */ /* //! Extracts Prominent Colors from an Image */
    hoveredIndex !== null && hoveredItem !== null ? ( 'image' in hoveredItem ? hoveredItem.image as string : 'aboutImage' in hoveredItem ? hoveredItem.aboutImage as string : 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/liked-songs-640.png' ) : 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/liked-songs-640.png'
  );

  useEffect(() => {
    dispatch(changeGradient('33, 17, 95')); // liked songs playlist purple
    dispatch(changeMediaInfo(''));
    dispatch(getQuickplayGridThunk());
    dispatch(getGridInfo())
  }, [dispatch]);

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

      {/* RECOMMENDED FOR TODAY */}
      <h2 className={styles.recommended}>Recommended For Today</h2>
      <div className={styles.mainGridSection}>
        {recommendedAlbums.map((album, index) => (
          <div key={index} onClick={() => navigate(`/album/${album._id}`)}>
            <img
              src={album.image as string}
              alt="playlist_album_photo"
            />
            <div className={styles.playButton}>
              <span className="fa fa-play" id={styles.playFa}></span>
            </div>
            <h4>{album.artistName}</h4>
            <p>{album.title}</p>
          </div>
        ))}
      </div>

      <h2 className={styles.recommended}>Popular Artists</h2>
      <div className={styles.mainGridSection}>
        {popularArtists.map((artist: any, index) => (
          <div key={index} onClick={() => navigate(`/artist/${artist._id}`)}>
            <img
              src={artist.aboutImage as string}
              alt="playlist_album_photo"
            />
            <div className={styles.playButton}>
              <span className="fa fa-play" id={styles.playFa}></span>
            </div>
            <h4>{artist.name}</h4>
            <p>Artist</p>
          </div>
        ))}
      </div>

      {/* <audio controls>
                <source src="https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+KILLKA.mp3" type="audio/mp3" />
            </audio> */}
    </div>
  );
};
