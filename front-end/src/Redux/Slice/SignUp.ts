import { createSlice } from "@reduxjs/toolkit";

interface user {
  id: string;
  username: string;
  refreshToken: string;
}

interface UserAccount {
  UserAccount: user | null;
}

const initialState: UserAccount = {
  UserAccount: null,
};
const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    createNewAccount: (state, action) => {
      state.UserAccount = action.payload;
    },
  },
});
export const { createNewAccount } = signUpSlice.actions;
export default signUpSlice.reducer;
