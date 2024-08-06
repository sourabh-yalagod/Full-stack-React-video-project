import axios from "axios";
import { Loader, LucideTrash2, TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "@/utils/Video";
import APIError from "@/utils/APIError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SkeletonCard } from "@/utils/Skeleton";
import { toast } from "@/components/ui/use-toast"; // Ensure you have a toast notification library
import axiosInstance from "@/Redux/api/axiosInstance";

const WatchLaterVideos = () => {
  const queryClient = useQueryClient()
  const { userId } = useParams();
  const [apiResponse, setApiResponse] = useState(null); // Initialize state with null

  const watchLaterVideos = async () => {
    const response = await axiosInstance.get(
      `/api/v1/users/all-watch-later-videos/${userId}`
    );
    return response.data;
  };

  const {
    data: watchlaterResponse,
    error: watchlaterError,
    isLoading: watchlaterLoading,
  } = useQuery({
    queryKey: ["watchlaterVideos", userId], // Include userId in queryKey
    queryFn: watchLaterVideos,
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => setApiResponse(data), // Update state only on success
  });
  useEffect(() => {
    setApiResponse(watchlaterResponse?.data);
  }, [watchlaterResponse]);
  const removeFromWatchLaterList = async ({ videoId }) => {
    const response = await axiosInstance.patch(
      `/api/v1/users/remove-watch-later-video`,
      { videoId }
    );
    return response.data;
  };

  const removeWatchLaterVideoMutation = useMutation({
    mutationFn: removeFromWatchLaterList,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey:['watchlaterVideos']})
      toast({
        title: "Video removed from watch later list successfully!",
        description: data?.message,
        variant: "default",
        duration: 1500,
      });
    },
    onError: (error) => {
      toast({
        title: "Video removing failed . . . . . !",
        description: error?.message,
        variant: "destructive",
        duration: 1500,
      });
    },
  });

  if (watchlaterError) {
    return <APIError />;
  }

  if (watchlaterLoading) {
    return <SkeletonCard cards={10} />;
  }

  return (
    <div className="min-h-screen w-full px-3 bg-#121212 pt-16 relative dark:bg-black">
      <div>
        <div className="text-black flex gap-2 items-center dark:text-white text-xl pb-3 animate-pulse sm:text-2xl font-black">
          <TimerIcon className="size-8"/>
          <p>Watch Later Videos</p>
        </div>
        {apiResponse?.watchLaterVideos?.length > 0 ? (
          <ul className="grid w-full gap-2 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {apiResponse.watchLaterVideos.map((video) => (
              <div
                key={video._id}
                className="border-slate-700 w-full border p-2 rounded-xl relative max-w-[450px]"
              >
                <Video
                  video={video}
                  userId={video.owner || ""}
                  avatar={apiResponse.avatar}
                  username={apiResponse.username}
                  dropMenuBar={[
                    {
                      name: removeWatchLaterVideoMutation.isPending ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Remove Video"
                      ),
                      operation: () =>
                        removeWatchLaterVideoMutation.mutate({
                          videoId: video._id,
                        }),
                    },
                  ]}
                />
              </div>
            ))}
          </ul>
        ) : (
          <div className="text-3xl flex gap-5 min-h-screen w-full justify-center items-center mb-11 text-center text-slate-600 my-auto">
            <LucideTrash2 className="size-12 text-center" />
            <p>No videos . . . . .</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchLaterVideos;
