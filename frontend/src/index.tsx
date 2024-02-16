import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import "./index.css";
import App from "./App";

import store from './store/store'
import { Provider as ReduxProvider } from 'react-redux' // import our store and context provider from redux

import { PersistGate } from "redux-persist/integration/react"; // PERSIST
import { persistStore } from "redux-persist"; // PERSIST

const persistor = persistStore(store) // PERSIST

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
    <ReduxProvider store={store}> {/* Wrap App with ReduxProvider */}
        <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>  {/* Wrap With PersistGate for Redux-Persist */}
          <App />
      </PersistGate>
        </BrowserRouter>
    </ReduxProvider>
  // </React.StrictMode>
);
