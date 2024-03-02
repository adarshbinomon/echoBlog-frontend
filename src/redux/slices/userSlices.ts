import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
  },
  reducers: {
    addUser: (state, action) => {
      console.log(action.payload, "action.payload");
      state.userData = { ...state.userData, ...action.payload };
    },
    clearUser: (state) => {
      state.userData = {};
    },
  },
});

export const { addUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
