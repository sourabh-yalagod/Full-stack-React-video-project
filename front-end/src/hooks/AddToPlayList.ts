import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";

export const useAddToPlayList = () => {
  const { toast } = useToast();
  const [addToPlaylistLoading, setAddToPlaylistLoading] = useState(false);
  const addToPlayList = async ({ videoId, playlistId }: any) => {
    console.log("{ videoId, playlistId } : ",{ videoId, playlistId });
    
    try {
      setAddToPlaylistLoading(true);
      const response = await axios.post(
        `/api/v1/video-play-list/new-video/${videoId}/${playlistId}`
      );
      toast({
        title: "Video added successfully . . . . . . . .",
        description: response?.data?.message,
        variant: "default",
      });
      console.log("API Response for playlist:", response);
    } catch (error: any) {
      console.log(error?.message);
      toast({
        title: "Somthing went wrong . . . . . .!",
        description: error?.message,
        variant: "default",
      });
    } finally {
      setAddToPlaylistLoading(false);
    }
  };
  return { addToPlayList, addToPlaylistLoading };
};
