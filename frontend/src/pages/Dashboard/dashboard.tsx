import React from "react";
import { useState } from "react";
import styles from './dashboard.module.css'

export const Dashboard: React.FC = () => {
    const [data, setData] = useState<any>(null)

    const handleTestBackend = async () => {
        try {
            const response = await fetch('/api/tracks/');
            if (response.ok) {
                const tracks = await response.json();
                setData(tracks);
                // You may choose to return tracks here if needed
            } else {
                console.error('Failed to fetch data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className={styles.testThis}>
            <h1 className={styles.welcomeMessage}>Good evening</h1>

            <div className={styles.quickplayPlaylists}>
                
                <div>
                    <img src='https://misc.scdn.co/liked-songs/liked-songs-300.png' alt="album_photo"/>
                    <div>
                        <p>Name of Song</p>
                        <div>Play Button</div>
                    </div>
                </div>
                <div>
                    <img src='https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Sahara-Album-8.jfif' alt="album_photo"/>
                    <div>
                        <p>Name of Song</p>
                        <div>Play Button</div>
                    </div>
                </div>
                <div>
                    <img src='https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif' alt="album_photo"/>
                    <div>
                        <p>Name of Song</p>
                        <div>Play Button</div>
                    </div>
                </div>
                <div>
                    <img src='https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Fear-Album-7.jfif' alt="album_photo"/>
                    <div>
                        <p>Name of Song</p>
                        <div>Play Button</div>
                    </div>
                </div>
                <div>
                    <img src='https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif' alt="album_photo"/>
                    <div>
                        <p>Name of Song</p>
                        <div>Play Button</div>
                    </div>
                </div>
                <div>
                    <img src='https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.jfif' alt="album_photo"/>
                    <div>
                        <p>Name of Song</p>
                        <div>Play Button</div>
                    </div>
                </div>

            </div>

            {/* <img src={"https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-images/%24B-Banner-Artist.jfif"} alt="$B Banner" width={'300px'} height={'200px'} />

            <audio controls>
                <source src="https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+KILLKA.mp3" type="audio/mp3" />
            </audio> */}

            <button onClick={handleTestBackend}>TEST BACKEND</button>
            { data && <p>{JSON.stringify(data)}</p> }
        </div>
    );
};
