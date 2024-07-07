import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signOutUser = createAsyncThunk<{ rejectValue: string }>(
  "auth/signout",
  async () => {
    try {
      const response = await axios.post(`/api/v1/users/logout`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error?.message);
    }
  }
);
