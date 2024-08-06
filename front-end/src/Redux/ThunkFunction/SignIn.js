import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
const signIn = createAsyncThunk("signIn", async (formData) => {
  try {
    const response = await axiosInstance.post(`/api/v1/users/login`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error?.message;
  }
});
export default signIn;
