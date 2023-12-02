import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    user: userSlice
  },
});