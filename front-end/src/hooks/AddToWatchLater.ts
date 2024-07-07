import axios from "axios";
import { useState } from "react";
// Custom hook to add a video to the watch later list

export const useAddToWatchLater = () => {
  const [watchLaterLoading, setWatchLaterLoading] = useState(false);
  const [watchLaterError, setWatchLaterError] = useState("");
  const [watchLaterResponse, setWatchLaterResponse] = useState({});
  const addToWatchLater = async (videoId: any) => {
    setWatchLaterLoading(true);
    setWatchLaterError("");
    try {
      const response = await axios.post(`/api/v1/users/watch-later`, {
        videoId,
      });
      setWatchLaterResponse(response?.data);
      console.log("Response from add to watch later: ", response.data);
    } catch (error: any) {
      setWatchLaterError(error?.message);
    } finally {
      setWatchLaterLoading(false);
    }
  };
  return {
    watchLaterLoading,
    watchLaterError,
    watchLaterResponse,
    addToWatchLater,
  };
};
