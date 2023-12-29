import React from "react";
import { useState } from "react";

const App: React.FC = () => {
  const [data, setData] = useState<any>(null)

  const handleTestBackend = async () => {
    try {
      const response = await fetch('/tracks/');
      console.log(response.json())
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
    <div className="App">
        <p>App</p>
        <img src={"https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-images/%24B-Banner-Artist.jfif"} alt="$B Banner" />

        <audio controls>
          <source src="https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+KILLKA.mp3" type="audio/mp3" />
        </audio>

        <button onClick={handleTestBackend}>TEST BACKEND</button>
        { data && <p>{data}</p> }

    </div>
  );
};

export default App;
