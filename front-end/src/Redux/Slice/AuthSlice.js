import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../ThunkFunction/Register";
import signIn from "../ThunkFunction/SignIn";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
const initialState = {
  user: null,
  isPending: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutuser: (state) => {
      state.data = null;
      state.isPending = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isPending = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.user = action.payload;
      state.error = null;
      // useQueryClient().invalidateQueries({ queryKey: ["userProfile"] });
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isPending = false;
      state.user = null;
      state.error =
        action.error.message || "User registration failed . . . . !";
    });

    builder
      .addCase(signIn.pending, (state) => {
        state.isPending = true;
        state.user = null;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isPending = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.user = null;
        state.isPending = false;
        console.log(action.error);
        if (action.error instanceof Error) {
          state.error = action.error.message;
        } else {
          state.error = "Failed sign in your account";
        }
      });
  },
});

export const { logOutuser } = authSlice.actions;
export default authSlice.reducer;
