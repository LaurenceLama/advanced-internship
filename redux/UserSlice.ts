import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  uid: null,
//   premium: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: any, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    //   state.premium = action.payload.premium;
    },
    signoutUser: (state: any) => {
      state.email = null;
      state.uid = null;
    //   state.premium = null;
    },
  },
});

export const { setUser, signoutUser } = userSlice.actions;

export default userSlice.reducer;
