import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  accessToken: string;
}

interface SignInState {
  loggedUser: User | null;
}

const initialState: SignInState = {
  loggedUser: null,
};

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    logedUser: (state, action) => {
      state.loggedUser = action.payload;
    },
    clearLoggedUser: (state) => {
      state.loggedUser = null;
    },
  },
});

export const { logedUser, clearLoggedUser } = signInSlice.actions;
export default signInSlice.reducer;
