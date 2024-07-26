import axios from "axios";
import { Loader, LucideTrash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import APIError from "@/utils/APIError";
import { SkeletonCard } from "@/utils/Skeleton";
import Video from "@/utils/Video";

const WatchHistory = () => {
  const { userId } = useParams();
  const [apiResponse, setApiResponse] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Function to handle watch history fetch
  const handleWatchHistoryVideos = async () => {
    const response = await axios.get(`/api/v1/users/watch-history/${userId}`);
    return response?.data;
  };

  // Query for watch history data
  const {
    data: watchhistoryData,
    isPending: watchhistoryLoading,
    error: watchhistoryError,
  } = useQuery({
    queryKey: ["watchHistoryVideos"],
    queryFn: handleWatchHistoryVideos,
    staleTime: 5 * 60 * 1000,
  });

  // Update apiResponse when watchhistoryData changes
  useEffect(() => {
    setApiResponse(watchhistoryData?.data);
  }, [watchhistoryData]);

  // Function to clear watch history
  const clearWatchHistory = async () => {
    const response = await axios.put(`/api/v1/videos/clear-watchhistory`);
    return response?.data;
  };

  // Mutation for clearing watch history
  const clearWatchHistoryMutation = useMutation({
    mutationFn: clearWatchHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchHistoryVideos"] });
      toast({
        title: "Watch history cleared successfully!",
        description: `At ${new Date().toLocaleString()}`,
        variant: "default",
        duration: 1200,
      });
    },
    onError: () => {
      toast({
        title: "Error clearing watch history!",
        description: `At ${new Date().toLocaleString()}`,
        variant: "destructive",
        duration: 1200,
      });
    },
  });

  // Render based on loading, error, and data
  if (watchhistoryLoading) {
    return <SkeletonCard cards={15} />;
  }
  if (watchhistoryError) {
    return <APIError />;
  }

  return (
    <div className="min-h-screen w-full p-5 bg-white dark:bg-black relative">
      <button
        className="p-2 border-gray-300 flex gap-2 my-4 border-[1px] dark:border-slate-700 rounded-xl text-gray-700 dark:text-slate-300"
        onClick={() => clearWatchHistoryMutation.mutate()}
      >
        {clearWatchHistoryMutation.isPending && <Loader className="animate-spin"/>}
        Clear Watch History
      </button>
      <div className="w-full min-h-auto grid">
        {apiResponse?.videos?.length > 0 ? (
          <ul className="grid w-full gap-2 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {apiResponse.videos.map((video) => (
              <div
                key={video._id}
                className="flex-1 min-w-[320px] max-w-[450px] border-slate-700 border p-2 rounded-xl relative"
              >
                <Video
                  video={video}
                  userId={video?.owner}
                  avatar={apiResponse?.avatar}
                  username={apiResponse?.username}
                />
              </div>
            ))}
          </ul>
        ) : (
          <div className="text-3xl flex gap-5 w-full justify-center items-centerw text-center text-gray-700 dark:text-white my-auto">
            <LucideTrash2 className="text-gray-700 dark:text-white size-12 text-center" />
            <p>Watch history is empty...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchHistory;
