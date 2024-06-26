import React, { useEffect, useState } from "react";
import { usePalette } from "react-palette";
import { hexToRgb, handleMouseEnter, handleMouseLeave } from "../../utils/gradientOverlayUtils";
import { useDashboardResizeStylings } from "../../hooks/useDashboardResizeStylings";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeGradient, changeMediaInfo } from "../../store/header/header";
import { getQuickplayGridThunk, getGridInfo } from "../../store/dashboard/dashboard";

import {ArtistDocument, AlbumDocument, PlaylistDocument} from '../../../../backend/src/db/models/modelTypes';
import { useNavigate } from "react-router-dom";

import styles from "./dashboard.module.css";

export const Dashboard: React.FC = () => {

  // use to reset top of page when navigating
  const mainContent = document.querySelector('.layout_mainContent__ZQulu') as HTMLDivElement | null;
  const header = document.querySelector('.header_header__lOwdN') as HTMLDivElement | null;

  const navigate = useNavigate()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const userQuickplayGrid: (AlbumDocument | ArtistDocument | PlaylistDocument)[] = useAppSelector((state) => state.dashboard.quickplayGrid)
  const recommendedAlbums: AlbumDocument[] = useAppSelector((state) => state.dashboard.recommendedForToday)
  const popularArtists = useAppSelector((state) => state.dashboard.popularArtists)
  const recentlyViewed = useAppSelector((state) => state.dashboard.recentlyViewed)
  const quickplayLoading: boolean = useAppSelector((state) => state.dashboard.quickplayLoading)
  const gridsLoading: boolean = useAppSelector((state) => state.dashboard.gridsLoading)

  const user: any = useAppSelector((state) => state.session.user)

  const gradientOverlay: HTMLElement | null = document.querySelector(
    ".dashboard_gradientOverlayForTransition__AEA6r"
    ) as HTMLElement;


  useDashboardResizeStylings(dispatch);
  const hoveredItem = hoveredIndex !== null ? userQuickplayGrid[hoveredIndex] : null
  const { data } = usePalette(
    /* { data, loading, error } */ /* //! Extracts Prominent Colors from an Image */
    hoveredIndex !== null && hoveredItem !== null ? ( (typeof hoveredItem === 'object' && 'image' in hoveredItem) ? hoveredItem.image as string : (typeof hoveredItem === 'object' && 'aboutImage' in hoveredItem) ? hoveredItem.aboutImage as string : 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/liked-songs-640.png' ) : 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/liked-songs-640.png'
  );

  useEffect(() => {
    if(user) {
      dispatch(changeGradient('33, 17, 95')); // liked songs playlist purple
      dispatch(changeMediaInfo(''));
      dispatch(getQuickplayGridThunk());
      dispatch(getGridInfo())
    }
  }, [dispatch, user]);

  if(user && (quickplayLoading || gridsLoading) ) {
    return <div></div>
  }

  return (
    (user ? <div className={styles.dashboard}>
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
              (typeof item === 'object' && 'image' in item) ?
              () => navigate(`/album/${item._id}`) :
              (typeof item === 'object' && 'name' in item) ?
              () => navigate(`/artist/${item._id}`) :
              index === 0 ?
              () => navigate(`/collection/tracks`) :
              () => navigate(`/playlist/${(item as any)._id}`)
            }
          >
            <div className={styles.imageContainer}>
              <img src={ (typeof item === 'object' && 'image' in item) ? item.image as string : (typeof item === 'object' && 'aboutImage' in item) ? item.aboutImage as string : 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/liked-songs-640.png'} alt="media_image" />
            </div>
            <div>
              <p>{ (typeof item === 'object' && 'title' in item) ? item.title as string : (typeof item === 'object' && 'name' in item) ? item.name as string : 'Liked Songs'}</p>
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
          <div key={index} onClick={(e) => {
            if ((e.target as HTMLElement).tagName.toLowerCase() === 'p') {
              if(mainContent && header) {
                mainContent.scrollTop = 0
                header.style.background = 'transparent'
                navigate(`/artist/${album.artist}`)
              }
            } else {
              if(mainContent && header) {
                mainContent.scrollTop = 0
                header.style.background = 'transparent'
                navigate(`/album/${album._id}`)
              }
            }
            }}>
            <div>
              <img
                src={album.image as string}
                alt="playlist_album_photo"
              />
            </div>
            <div className={styles.playButton}>
              <span className="fa fa-play" id={styles.playFa}></span>
            </div>
            <h4>{album.title}</h4>
            <p className={styles.artistClick}>{album.artistName}</p>
          </div>
        ))}
      </div>

      {/* Recently Viewed */}
      <h2 className={styles.recommended}>Recently Viewed</h2>
      <div className={styles.mainGridSection}>
        {recentlyViewed.map((album: any, index) => (
          <div key={index} onClick={(e) => {
            if ((e.target as HTMLElement).tagName.toLowerCase() === 'p') {
              if(mainContent && header) {
                mainContent.scrollTop = 0
                header.style.background = 'transparent'
                navigate(`/artist/${album.artist}`)
              }
            } else {
              if(mainContent && header) {
                mainContent.scrollTop = 0
                header.style.background = 'transparent'
                navigate(`/album/${album._id}`)
              }
            }
            }}>
          <div>
            <img
              src={album.image as string}
              alt="playlist_album_photo"
            />
          </div>
          <div className={styles.playButton}>
            <span className="fa fa-play" id={styles.playFa}></span>
          </div>
          <h4>{album.title}</h4>
          <p className={styles.artistClick} onClick={() => navigate(`/artist/${album.artist}`)}>{album.artistName}</p>
          </div>
        ))}
      </div>

      {/* Popular Artists */}
      <h2 className={styles.recommended}>Popular Artists</h2>
      <div className={styles.mainGridSection}>
        {popularArtists.map((artist: any, index) => (
          <div
            key={index}
            onClick={() => {
              if (mainContent && header) {
                mainContent.scrollTop = 0; // Set scroll position to the top
                header.style.background = 'transparent';
                navigate(`/artist/${artist._id}`)
              }
            }}
          >
            <div>
            <img
              src={artist.aboutImage as string}
              alt="playlist_album_photo"
            />
          </div>
            <div className={styles.playButton}>
              <span className="fa fa-play" id={styles.playFa}></span>
            </div>
            <h4>{artist.name}</h4>
            <p>Artist</p>
          </div>
        ))}
      </div>

    </div> :

    <div className={styles.dashboard}>
      <div className={styles.redirectUser} style={{height: '350px', width: '1000px'}}>
        <div>
          <img src="https://sebass-novawave.s3.us-east-2.amazonaws.com/playlist-photos/novawavelogoofficial.png" alt="novawave-no-sign-in"></img>
        </div>
        <div>
          <h3>Start Listening with a free Novawave account</h3>
          <button onClick={() => navigate('/signup')}>Sign up for free</button>
          <p>Already have an account..?</p>
          <button onClick={() => navigate('/login')}>Log In</button>
        </div>
      </div>
    </div> )
  );
};
