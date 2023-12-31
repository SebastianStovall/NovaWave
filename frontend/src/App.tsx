import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard/dashboard";
import { Auth } from "./pages/Auth";

import { Layout } from "./components/Layout/layout";

import { useAppDispatch } from "./hooks";
import { restoreUser } from "./store/session/session";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // Check for and restore user information on page refresh
  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <div>
      { (
        <Routes>
          <Route path="/" element={ <Layout><Dashboard /></Layout> } />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      )}
    </div>
  );
};

export default App;

//? THE PLAN

//! APP

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import LayoutRoute from './LayoutRoute';
// import MyPage from './MyPage'; // Example page component

// const App = () => (
//   <Routes>
//     {/* Use LayoutRoute for pages that follow this layout */}
//     <Route path="/" element={<LayoutRoute><MyPage /></LayoutRoute>} />
//     {/* Add other routes as needed */}
//   </Routes>
// );

// export default App;
