import axios, { AxiosError } from "axios";
import { useState } from "react";

export const addToPlaylist = async ({ videoId }: any) => {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse]: any = useState("");
  const [error, setError]: any = useState("");

  try {
    setLoading(true);
    setError("");
    const response = await axios.get(
      `/api/v1/video-play-list/new-video/${videoId}`
    );
    setApiResponse(response?.data?.data);
    console.log("API Response for playlist:", apiResponse);
  } catch (error) {
    const err = error as AxiosError;
    setError(err.message ?? "Error while API call");
  } finally {
    setLoading(false);
  }
  return { loading, error, apiResponse };
};
