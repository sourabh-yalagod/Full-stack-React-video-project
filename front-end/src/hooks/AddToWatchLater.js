import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddToWatchLater = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const time = new Date();

  const addToWatchLater = async (videoId) => {
    const response = await axios.post(`/api/v1/users/watch-later`, { videoId });
    return response?.data;
  };
  const watchLaterMutation = useMutation({
    mutationFn: addToWatchLater,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlaterVideos"] });
      toast({
        title: "Video added to watch later list . . . !",
        description: "At " + time.toLocaleTimeString(),
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: error?.message || "failed please try again . . . . . !",
        description: "At " + time.toLocaleTimeString(),
        variant: "destructive",
        duration: 3000,
      });
    },
  });
  return {
    watchLaterLoading: watchLaterMutation.isPending,
    watchLaterError: watchLaterMutation.error,
    watchLaterResponse: watchLaterMutation.data,
    addToWatchLater: watchLaterMutation.mutate,
  };
};
