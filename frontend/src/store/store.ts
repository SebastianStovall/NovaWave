import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import sessionReducer from './session'
import sidebarReducer from './sidebar';

const rootReducer = combineReducers({ // combine reducers here
    session: sessionReducer,
    sidebar: sidebarReducer
});


const store = configureStore({ // configure store with the reducer here, toolkit should come with redux-thunk middlewaree by default
    reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>  // Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export default store; // use in index.tsx
