import axios, { AxiosError } from "axios";
import { useState } from "react";

const addToPlaylist = async ({ videoId }) => {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const [error, setError] = useState("");

  try {
    setLoading(true);
    setError("");
    const response = await axios.get(
      `/api/v1/video-play-list/new-video/${videoId}`
    );
    setApiResponse(response?.data?.data);
    console.log("API Response for playlist:", apiResponse);
  } catch (error) {
    const err = error;
    setError(err.message ?? "Error while API call");
  } finally {
    setLoading(false);
  }
  return { loading, error, apiResponse };
};
