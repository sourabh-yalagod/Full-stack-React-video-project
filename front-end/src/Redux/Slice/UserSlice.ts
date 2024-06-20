// slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { SignIn } from "../ThunkFunction/SignIn"; 

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null ,
    status: 'idle',
    error: null,
  },
  reducers: {
    getId: (state:object, action) => {
      state.id = action.payload._id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.id = action?.payload._id;
      })
      .addCase(SignIn.rejected, (state) => {
        state.status = 'failed';
        // state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { getId } = userSlice.actions;
