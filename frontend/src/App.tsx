import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard/dashboard";
import { Auth } from "./pages/Auth";

import { Layout } from "./components/Layout/layout";

import { useAppDispatch } from "./hooks";
import { restoreUser } from "./store/session/session";

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useAppDispatch();

  // Check for and restore user information on page refresh
  useEffect(() => {
    dispatch(restoreUser());
    setIsLoaded(true)
  }, [dispatch]);

  return (
    <div>
      { isLoaded && (
        <Routes>
          <Route path="/" element={ <Layout><Dashboard /></Layout> } />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
