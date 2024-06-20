import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser } from "../ThunkFunction/Register";
import { SignIn } from "../ThunkFunction/SignIn";

interface RegisterStages {
  isLoading: boolean;
  data: object | null | void;
  pending: boolean;
  error: object | null | string;
  success: boolean;
}

const initialState: RegisterStages = {
  isLoading: false,
  data: null,
  pending: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutuser: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
      state.success = true;
      state.pending = false;
    },
    FalsifySuccess: (state) => {
      state.success = false;
    },
    NullifyError: (state) => {
      state.error = null;
    },
    SetError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.pending = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<object>) => {
        state.isLoading = false;
        state.pending = false;
        state.data = action.payload;
        state.success = true;
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.pending = false;
      state.error =
        (action.payload as string) || "Failed to register your account";
    });

    // -----------------------

    builder.addCase(SignIn.pending, (state) => {
      state.pending = true;
      
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(SignIn.rejected, (state, action) => {
      if (action.error instanceof Error) {
        state.error = action.error.message;
      } else {
        state.error = "User signin failed . . . .!";
      }
    });
  },
});

export const { logOutuser, FalsifySuccess, NullifyError, SetError } =
  authSlice.actions;
export default authSlice.reducer;
