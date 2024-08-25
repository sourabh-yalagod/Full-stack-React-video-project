import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import Cookies from "js-cookie";
const signIn = createAsyncThunk("signIn", async (formData) => {
  try {
    const response = await axiosInstance.post(`/api/v1/users/login`, formData, {
      withCredentials: true,
    });
    const token = response?.data?.data?.accessToken;
    Cookies.set("token", token);
    console.log("response?.data?.data?.id : ",response?.data?.data?.id);
    
    return response.data;
  } catch (error) {
    return error?.message;
  }
});
export default signIn;
