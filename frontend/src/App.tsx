
import React from "react";

const App: React.FC = () => {

  return (
    <div>
        <p>App</p>
        <img src={"https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-images/%24B-Banner-Artist.jfif"} alt="$B Banner" />

      <audio controls>
        <source src="https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+KILLKA.mp3" type="audio/mp3" />
    </audio>
    </div>
  );
};

export default App;
