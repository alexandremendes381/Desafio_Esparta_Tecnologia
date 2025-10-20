import { configureStore } from "@reduxjs/toolkit";
import githubUserReducer from "./slices/github-user-slice";

export const store = configureStore({
  reducer: {
    githubUser: githubUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;