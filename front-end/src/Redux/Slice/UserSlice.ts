// slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { SignIn } from "../ThunkFunction/SignIn"; 

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null ,
    token:null ,
    status: 'idle',
    error: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload?.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.id = action?.payload?.id;
        state.token = action?.payload?.token;
      })
      .addCase(SignIn.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
export const { getUser } = userSlice.actions;
