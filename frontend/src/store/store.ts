import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sessionReducer from "./session/session";
import libraryReducer from "./library/library";
import sidebarReducer from "./sidebar/sidebar";
import headerReducer from "./header/header";
import dashboardReducer from './dashboard/dashboard';
import mediaReducer from './media/media';
import playerReducer from './player/player'
import persistantReducer from './persist/persist';

import storage from "redux-persist/lib/storage"; // PERSIST
import { persistReducer } from "redux-persist"; // PERSIST

const reducer = combineReducers({
    session: sessionReducer,
    library: libraryReducer,
    sidebar: sidebarReducer,
    header: headerReducer,
    dashboard: dashboardReducer,
    media: mediaReducer,
    player: playerReducer,
    persist: persistantReducer
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['persist'], // Add the reducers you want to persist here
  blacklist: ['sidebar', 'library', 'session', 'header', 'dashboard', 'media', 'player'] // exclude reducers from persist here
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  // configure store with the reducer here, toolkit should come with redux-thunk middlewaree by default
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, // disables a warning for redux-persist
    }); // Thunk middleware is included by default
  },
});

export type RootState = ReturnType<typeof store.getState>; // Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch; // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export default store; // use in index.tsx





// ---------------------------------------------------------------------------------------------------------------------------------------------------------- //

// store setup without redux persist

// import { configureStore } from "@reduxjs/toolkit";
// import sessionReducer from "./session/session";
// import libraryReducer from "./library/library";
// import sidebarReducer from "./sidebar/sidebar";
// import headerReducer from "./header/header";
// import dashboardReducer from './dashboard/dashboard'

// const store = configureStore({
//   // configure store with the reducer here, toolkit should come with redux-thunk middlewaree by default
//   reducer: {
//     session: sessionReducer,
//     library: libraryReducer,
//     sidebar: sidebarReducer,
//     header: headerReducer,
//     dashboard: dashboardReducer
//   },
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware(); // Thunk middleware is included by default
//   },
// });

// export type RootState = ReturnType<typeof store.getState>; // Infer the `RootState` and `AppDispatch` types from the store itself
// export type AppDispatch = typeof store.dispatch; // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export default store; // use in index.tsx
