import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
const signIn = createAsyncThunk("signIn", async (formData) => {
  try {
    const response = await axiosInstance.post(`/api/v1/users/login`, formData, {
      withCredentials: true,
    });
    const token = response?.data?.data?.accessToken;
    localStorage.setItem("token", token);
    console.log("response?.data?.data?.id : ", response?.data?.data?.id);
    
    return response.data;
  } catch (error) {
    return error?.message;
  }
});
export default signIn;
