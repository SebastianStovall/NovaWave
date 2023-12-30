import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from "./components/Dashboard";
import { Auth } from "./components/Auth";

import { useAppDispatch } from "./hooks";
import { restoreUser } from "./store/session";

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isLoaded, setIsLoaded] = useState(false);

  // Check for and restore user information on page refresh
  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      {isLoaded && (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      )}
    </div>
  );
};

export default App;
