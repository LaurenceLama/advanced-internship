import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginModal: false,
  SideBarModal: false,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModal = true;
    },
    closeLoginModal: (state) => {
      state.loginModal = false;
    },
    openSideBarModal: (state) => {
      state.SideBarModal = true;
    },
    closeSideBarModal: (state) => {
      state.SideBarModal = false;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openSideBarModal,
  closeSideBarModal
} = ModalSlice.actions;

export default ModalSlice.reducer;
