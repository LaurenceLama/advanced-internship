import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./ModalSlice";
import UserSlice from "./UserSlice";

export default configureStore({
  reducer: {
    modal: ModalSlice,
    user: UserSlice
  },
});
