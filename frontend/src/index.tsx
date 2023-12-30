import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import "./index.css";
import App from "./App";

import store from './store/store'
import { Provider as ReduxProvider } from 'react-redux' // import our store and context provider from redux

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}> {/* Wrap App with ReduxProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);
