import { configureStore } from "@reduxjs/toolkit";
import githubUserReducer from "./slices/github-user-slice";
import favoritesReducer from "./slices/favorites-slice";

export const store = configureStore({
  reducer: {
    githubUser: githubUserReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;