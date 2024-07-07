import axios, { AxiosError } from "axios";
import { useState } from "react";

export const useHandleLikes = () => {
  const [likeResponse, setLikeResponse] = useState("");
  const [likeError, setLikeError] = useState("");
  const handleLikes = async ({ userId, videoId }: any) => {
    console.log({ userId, videoId });

    try {
      const response = await axios.post(
        `/api/v1/likes/toggle-like-status/${videoId}`,
        {
          userId: userId,
        }
      );
      setLikeResponse(response.data.data);
      console.log("likeResponse : ", response.data);
    } catch (error) {
      const axiosError: any = error as AxiosError;
      setLikeError(axiosError);
    }
  };
  return { likeError, handleLikes, likeResponse };
};
