import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

export const registerUser = createAsyncThunk("registerUser", async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/api/v1/users/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response.data || "Failed to register your account"
    );
  }
});
