import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";
// Custom hook to add a video to the watch later list

export const useAddToWatchLater = () => {
  const [watchLaterLoading, setWatchLaterLoading] = useState(false);
  const [watchLaterError, setWatchLaterError] = useState("");
  const [watchLaterResponse, setWatchLaterResponse] = useState({});
  const {toast}=useToast()
  const addToWatchLater = async (videoId: any) => {
    setWatchLaterLoading(true);
    setWatchLaterError("");
    try {
      const response = await axios.post(`/api/v1/users/watch-later`, {
        videoId,
      });
      setWatchLaterResponse(response?.data);
      console.log("Response from add to watch later: ", response.data);
      toast({
        title: "Video added to watch-later list successfully",
        duration:2500
      })
    } catch (error: any) {
      setWatchLaterError(error?.message);
      toast({
        title: "failed . . . . .!! Please login and try again",
        duration:2500
      })
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
