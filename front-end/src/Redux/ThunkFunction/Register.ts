import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk<
  object,
  FormData,
  { rejectValue: string }
>("auth/registerUser", async (formData: FormData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/v1/users/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response.data || "Failed to register your account"
    );
  }
});
