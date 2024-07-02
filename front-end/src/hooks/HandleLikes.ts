import axios, { AxiosError } from "axios";
import { useState } from "react";

export const useHandleLikes = () => {
  const [res, setRes] = useState("");
  const [error, setError] = useState("");
  const handleLikes = async ({ apiResponse, videoId }: any) => {
    try {
      const response = await axios.post(
        `/api/v1/likes/toggle-like-status/${videoId}`,
        {
          userId: apiResponse?.Uploader?._id,
        }
      );
      setRes(response.data.data);
      console.log("likeResponse : ", response.data);
    } catch (error) {
      const axiosError: any = error as AxiosError;
      setError(axiosError);
    }
  };
  return { error, handleLikes, res };
};
