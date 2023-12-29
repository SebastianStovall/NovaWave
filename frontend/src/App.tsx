import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from "./components/Dashboard";
import { Auth } from "./components/Auth";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
