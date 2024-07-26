import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    token: null,
    status: "idle",
  },
  reducers: {
    getUser: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.accessToken;
    },
    logoutUser: (state) => {
      state.id = null;
      state.token = null;
    },
  },
});

export const { getUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
