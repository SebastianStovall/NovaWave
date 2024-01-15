import React, { useState } from "react";
import styles from './dashboard.module.css';
import { usePalette } from 'react-palette';
import { hexToRgb, imageUrls, handleMouseEnter, handleMouseLeave } from "../../utils/gradientOverlayUtils";
import { useQuickplayAlbumGridDisplayResize } from "../../hooks/useQuickplayAlbumGridDisplayResize";

export const Dashboard: React.FC = () => {
    useQuickplayAlbumGridDisplayResize();
    const gradientOverlay: HTMLElement | null = document.querySelector('.dashboard_gradientOverlayForTransition__AEA6r') as HTMLElement;

    const [trackdata, setTrackdata] = useState<any>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const { data } = usePalette(  /* { data, loading, error } */  /* //! Extracts Prominent Colors from an Image */
        hoveredIndex !== null ? imageUrls[hoveredIndex] : imageUrls[0]
    );

    const handleTestBackend = async () => {
        try {
            const response = await fetch('/api/tracks/');
            if (response.ok) {
                const tracks = await response.json();
                setTrackdata(tracks);
            } else {
                console.error('Failed to fetch data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className={styles.dashboard}>
            <div className={styles.gradientOverlayForTransition}  /* ACTS AS '.dashboard::before' for Gradient Transition */
                style={{background: `linear-gradient(to bottom, rgba(${hexToRgb(data.darkVibrant)}) 64px, #121212 300px, #121212)`}}>
            </div>

            <h1 className={styles.welcomeMessage}>Good evening</h1>
            <div className={styles.quickplayPlaylists}>
                {Array.from({ length: 6 }, (_, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index, setHoveredIndex, gradientOverlay)}
                        onMouseLeave={() => handleMouseLeave(gradientOverlay)}
                    >
                        <img src={imageUrls[index]} alt="album_photo" />
                        <div>
                            <p>Name of Song</p>
                            <div>Play Button</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.testGrid}>
                {Array.from({ length: 9 }, (_, index) => (
                    <div key={index} >
                        {index}
                    </div>
                ))}
            </div>

            {/* <audio controls>
                <source src="https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+KILLKA.mp3" type="audio/mp3" />
            </audio> */}

            <button onClick={handleTestBackend}>TEST BACKEND</button>
            { trackdata && <p>{JSON.stringify(trackdata)}</p> }
        </div>
    );
};
