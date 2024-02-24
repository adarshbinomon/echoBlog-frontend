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
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
