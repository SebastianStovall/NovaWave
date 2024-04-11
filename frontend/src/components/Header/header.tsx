import React, { useEffect } from "react";
import styles from "./header.module.css";
import { useAppSelector } from "../../hooks";
import { useAppDispatch } from "../../hooks";
import { useLocation } from "react-router-dom";
import { handlePlayFromStart } from "../../utils/audio/mediaViewHelpers";
import mediaViewStyles from "../../pages/MediaView/mediaView.module.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/session/session";
import { getLikedSongsPlaylistLength, isCurrentSongInLikedSongs } from "../../utils/audio/likedSongsPlaylistHelpers";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.session.user);
  const headerState = useAppSelector((state) => state.header);
  const location = useLocation();

  // Audio Related
  const dispatch = useAppDispatch();
  const songList = useAppSelector((state) => state.player.songList);
  const play = useAppSelector((state) => state.player.play);
  const currentSong: any = useAppSelector((state) => state.player.currentSong);
  const currentAlbumMedia: any = useAppSelector(
    (state) => state.media.albumData
  );
  const currentPlaylistMedia: any = useAppSelector(
    (state) => state.media.playlistData
  );

  // Artist Page Related
  const artistTopSongs: any = useAppSelector(
    (state) => state.artist.artistTopSongs
  );

  useEffect(() => {
    /* header component is absolutely positioned with relative container so full width works, however, JS scroll logic is needed to acheieve sticking behavior due to relatively positioned parent */
    const handleScroll = () => {
      const mainContent = document.querySelector(
        ".layout_mainContent__ZQulu"
      ) as HTMLElement | null;
      const header = document.querySelector(
        ".header_header__lOwdN"
      ) as HTMLElement | null;

      if (mainContent && header) {
        const scrollPosition = mainContent.scrollTop;
        header.style.top = `${scrollPosition}px`; // set header positioned based on scroll position in mainContent div

        let bgOpacity;
        if (location.pathname === "/") {
          // DASHBOARD
          bgOpacity = Math.min(scrollPosition / 120, 1);
        } else if (
          location.pathname.split("/")[1] === "album" ||
          location.pathname.split("/")[1] === "collection"
        ) {
          // MEDIA VIEW PAGE
          const steps = Math.min(Math.floor((scrollPosition - 179) / 5), 12);
          bgOpacity = Math.min(steps * 0.05, 0.6);

          const playButtonContainer = document.querySelector(
            ".mediaView_mediaContent__9MFyo"
          ) as HTMLDivElement | null;
          const headerPlayButton = document.querySelector(
            ".mediaView_resumeAndPause__hK21k"
          ) as HTMLDivElement | null;
          const headerMediaText = document.querySelector(
            ".header_headerMediaText__u3IHJ"
          ) as HTMLDivElement | null;

          //* TOGGLE MEDIA TITLE TEXT + PLAY BUTTON OPACITY DEPENDING ON SCROLL POSITION
          if (playButtonContainer && headerPlayButton && headerMediaText && scrollPosition >= playButtonContainer.scrollHeight + 10) {
            headerPlayButton.style.opacity = "1";
            headerMediaText.style.opacity = "1";
          } else {
            if(headerPlayButton && headerMediaText) {
              headerPlayButton.style.opacity = "0";
              headerMediaText.style.opacity = "0";
            }
          }
        } else if (location.pathname.split("/")[1] === "artist") {
          // ARTIST PAGE
          const coverBackground = document.querySelector(
            ".artistView_coverBannerBackground__eHIZw"
          ) as HTMLDivElement;
          const artistBannerContainer = document.querySelector(
            ".artistView_mediaContent__R7nyD"
          ) as HTMLDivElement;

          const maxOpacity = 0.6;
          const thresholdDistance = artistBannerContainer.scrollHeight - 219;

          if (scrollPosition >= thresholdDistance) {
            bgOpacity = maxOpacity;
            header.style.background = `linear-gradient(rgba(0,0,0,${bgOpacity}) 0,rgba(18,18,18,${
              bgOpacity / 0.6
            }) 100vw),rgba(${headerState.color}, ${bgOpacity / 0.6})`;
            coverBackground.style.background = `linear-gradient(rgba(0,0,0,${bgOpacity}) 0,rgba(18,18,18,${
              bgOpacity / 0.6
            }) 900vw),rgba(${headerState.color}, ${bgOpacity / 0.6})`;
          } else {
            bgOpacity = (scrollPosition / thresholdDistance) * maxOpacity;
            header.style.background = `linear-gradient(rgba(0,0,0,${0}) 0,rgba(18,18,18,${0}) 100vw),rgba(${
              headerState.color
            }, ${0})`;
            coverBackground.style.background = `linear-gradient(rgba(0,0,0,${bgOpacity}) 0,rgba(18,18,18,${
              bgOpacity / 0.6
            }) 900vw),rgba(${headerState.color}, ${bgOpacity / 0.6})`;
          }

          const artistBackgroundContainer = document.querySelector(
            ".artistView_coverBannerBackground__eHIZw"
          ) as HTMLDivElement | null;
          const headerPlayButton = document.querySelector(
            ".mediaView_resumeAndPause__hK21k"
          ) as HTMLDivElement | null;
          const headerMediaText = document.querySelector(
            ".header_headerMediaText__u3IHJ"
          ) as HTMLDivElement | null;

          //* TOGGLE MEDIA TITLE TEXT + PLAY BUTTON OPACITY DEPENDING ON SCROLL POSITION
          if (headerPlayButton && headerMediaText && artistBackgroundContainer && scrollPosition >= artistBackgroundContainer.clientHeight + 14) {
            headerPlayButton.style.opacity = "1";
            headerMediaText.style.opacity = "1";
          } else {
            if(headerPlayButton && headerMediaText) {
              headerPlayButton.style.opacity = "0";
              headerMediaText.style.opacity = "0";
            }
          }
        }

        if (location.pathname === "/") {
          // DASHBOARD
          header.style.backgroundColor = `rgba(${headerState.color}, ${bgOpacity})`;
        } else if (
          location.pathname.split("/")[1] === "album" ||
          location.pathname.split("/")[1] === "collection"
        ) {
          // MEDIA VIEW
          header.style.background = `linear-gradient(rgba(0,0,0,${bgOpacity}) 0,rgba(18,18,18,${
            bgOpacity === 0.6 ? 1 : bgOpacity
          }) 100vw),rgba(${headerState.color}, ${
            bgOpacity === 0.6 ? 1 : bgOpacity
          })`;
        }
      }
    };

    const mainContent = document.querySelector(
      ".layout_mainContent__ZQulu"
    ) as HTMLElement;
    mainContent.addEventListener("scroll", handleScroll); // attach scroll event listener onto mainContent div

    return () => {
      mainContent.removeEventListener("scroll", handleScroll);
    };
  }, [headerState, location.pathname]);

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
    setTimeout(() => {
      window.location.reload();
    }, 500)
  };

  function playOrPause() {
    //* MEDIA VIEW PAGE ALBUM
    if (location.pathname.split("/")[1] === "album") {
      if (
        currentSong &&
        currentSong.albumName === headerState.media &&
        location.pathname.split("/")[1] === "album"
      ) {
        // If header media album name matches the currently queued song list album name
        if (play === true) {
          return `fas fa-pause`;
        } else {
          return `fas fa-play`;
        }
      } else {
        return `fas fa-play`;
      }
    } else if (location.pathname.split("/")[1] === "collection") {
      //* MEDIA VIEW PAGE LIKED SONGS
      if (
        songList &&
        isCurrentSongInLikedSongs(currentPlaylistMedia, currentSong)
      ) {
        // If header media album name matches the currently queued song list album name
        if (play === true) {
          return `fas fa-pause`;
        } else {
          return `fas fa-play`;
        }
      } else {
        return `fas fa-play`;
      }
    } else if (location.pathname.split("/")[1] === "artist") {
      //* IF ON ARTIST PAGE
      interface Song {
        _id: string;
      }
      if (currentSong && artistTopSongs) {
        const isCurrentSongInArtistTopSongs = artistTopSongs.some(
          (song: Song) => song._id === currentSong._id
        );
        if (play === true && isCurrentSongInArtistTopSongs) {
          return `fas fa-pause`;
        } else {
          return `fas fa-play`;
        }
      } else {
        return "fas fa-play";
      }
    }
  }

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.headerLeftSection}>
          <div className={styles.prevAndForwardPageControl}>
            <button>
              <svg
                aria-hidden="true"
                width="15px"
                height="18px"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
              </svg>
            </button>
            <button>
              <svg
                aria-hidden="true"
                width="15px"
                height="18px"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path>
              </svg>
            </button>
          </div>

          {headerState && headerState.media && (
            <div className={styles.headerMediaContainer}>
              <div
                className={mediaViewStyles.resumeAndPause}
                style={{
                  width: "48px",
                  height: "48px",
                  opacity: "0",
                  transition: "opacity 0.5s ease",
                }}
                onClick={() => {
                  //! If you are on Media page, play the start of the album
                  if (location.pathname.split("/")[1] !== "artist") {
                    if(location.pathname.split('/')[1] === 'collection' && currentPlaylistMedia && getLikedSongsPlaylistLength(currentPlaylistMedia) === '0:00') {
                      // dont play if in collection that has no liked songs
                      return
                    }
                    handlePlayFromStart(
                      currentAlbumMedia,
                      currentPlaylistMedia,
                      currentSong,
                      location.pathname.split("/")[1],
                      play,
                      dispatch
                    );
                  } else {
                    //! If you are on artist page, the album will be the artists most popular songs
                    handlePlayFromStart(
                      { tracks: artistTopSongs },
                      currentPlaylistMedia,
                      currentSong,
                      location.pathname.split("/")[1],
                      play,
                      dispatch
                    );
                  }
                }}
              >
                <div className={playOrPause()}></div>
              </div>
            </div>
          )}
          {headerState && headerState.media && (
            <p className={styles.headerMediaText}>{headerState.media}</p>
          )}
        </div>

        {user ? (
          <div className={styles.profileIconContainer}>
            <button>
              <img
                src="https://i.pinimg.com/736x/35/99/27/359927d1398df943a13c227ae0468357.jpg"
                alt="pf-pic"
                onClick={() => {
                  logoutUser()
                }}
              />
            </button>
          </div>
        ) : (
          <ul className={styles.headerAuthRedirect}>
            <li>
              <a href="/signup">Sign up</a>
            </li>
            <button type="button">
              <a href="/login">Log In</a>
            </button>
          </ul>
        )}
      </div>
    </div>
  );
};
