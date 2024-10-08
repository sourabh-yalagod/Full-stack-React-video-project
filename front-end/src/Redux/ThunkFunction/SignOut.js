import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

export const signOutUser = createAsyncThunk("auth/signout", async () => {
  try {
    const response = await axiosInstance.post(`/api/v1/users/logout`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    localStorage.removeItem('token')
    return response.data;
  } catch (error) {
    console.log(error?.message);
  }
});
