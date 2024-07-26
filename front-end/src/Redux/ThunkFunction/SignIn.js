import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const signIn = createAsyncThunk(
  "signIn",
  async (formData) => {
    try {
      const response = await axios.post(`/api/v1/users/login`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error?.message
      
    }
  }
);
export default signIn
