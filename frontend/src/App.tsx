import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard/dashboard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { MediaView } from "./pages/MediaView/mediaView";
import { ArtistView } from "./pages/ArtistView/artistView";

import { Layout } from "./components/Layout/layout";

import { useAppDispatch } from "./hooks";
import { useAppSelector } from "./hooks";
import { restoreUser } from "./store/session/session";

import { initializeStoreWithDummyTrack } from "./store/player/player";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoaded = useAppSelector((state) => state.session.isLoaded)

  // Check for and restore user information on page refresh
  useEffect(() => {
    dispatch(restoreUser());
    dispatch(initializeStoreWithDummyTrack())
  }, [dispatch]);

  console.log("PAGE RE-RENDER FROM APP")

  return (
    <div>
      { isLoaded && (
        <Routes>
          <Route path="/" element={ <Layout><Dashboard /></Layout> } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/collection/tracks" element={<Layout><MediaView/></Layout>} />
          <Route path="/album/:albumId" element={<Layout><MediaView/></Layout>} />
          <Route path="/playlist/:playlistId" element={<Layout><MediaView/></Layout>} />
          <Route path="/artist/:artistId" element={<Layout><ArtistView/></Layout>} />
        </Routes>
      )}
    </div>
  );
};

export default App;
