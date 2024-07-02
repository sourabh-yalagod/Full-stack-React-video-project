import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
// Custom hook to add a video to the watch later list

export const useAddToWatchLater = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState("");
  const [res, setRes] = useState({});
  const addToWatchLater = async (videoId: any) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(`/api/v1/users/watch-later`, {
        videoId,
      });
      setRes(response?.data);
      console.log("Response from add to watch later: ", response.data);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, err, res, addToWatchLater };
};
