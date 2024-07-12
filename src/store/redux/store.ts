import { configureStore } from "@reduxjs/toolkit";
import classReducer from "../../classSlice";

export const store = configureStore({
    reducer: classReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
