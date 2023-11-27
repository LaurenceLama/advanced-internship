import { createSlice } from "@reduxjs/toolkit";

// export interface ModalState {
//   loginModal: boolean;
// }

const initialState = {
  loginModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModal = true;
    },
    closeLoginModal: (state) => {
      state.loginModal = false;
    },
  },
});

export const { openLoginModal, closeLoginModal } = modalSlice.actions;

export default modalSlice.reducer;
