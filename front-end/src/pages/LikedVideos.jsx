import axios, { AxiosError } from "axios";
import { HeartIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "@/utils/Video";
import APIError from "@/utils/APIError";
import VideoNotFound from "@/utils/VideoNotFound";
import { useHandleLikes } from "@/hooks/HandleLikes";
import { SkeletonCard } from "@/utils/Skeleton";
import { useQuery } from "@tanstack/react-query";
const LikedVideos = () => {
  const { handleLikes, likeLoading } = useHandleLikes();
  const { userId } = useParams();
  const [apiResponse, setApiResponse] = useState("");

  const handleLikedVideos = async () => {
    const response = await axios.get(
      `/api/v1/likes/all-favourate-videos/${userId}`
    );
    return response?.data;
  };

  const {
    data: userProfileData,
    isPending: likedVideosLoading,
    error: likedVideosError,
  } = useQuery({
    queryKey: ["likedVideos"],
    queryFn: handleLikedVideos,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setApiResponse(userProfileData?.data);
  }, [userProfileData]);

  if (likedVideosLoading) {
    return <SkeletonCard cards={15} />;
  }
  if (likedVideosError) {
    return <APIError />;
  }
  return (
    <div className="min-h-screen w-full px-3 space-y-6 bg-white dark:bg-black">
      <div className="text-2xl flex gap-2 items-center sm:text-3xl py-5 font-mono text-gray-800 dark:text-slate-400 font-semibold">
        <HeartIcon className="size-8 border-none animate-pulse" />
        <p>Favorite Videos :</p>
      </div>
      <div className="w-full min-h-auto grid place-items-center">
        {apiResponse?.length > 0 ? (
          <ul className="grid w-full gap-2 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {apiResponse?.map((video) => (
              <div
                key={video?._id}
                className="border-slate-700 w-full border p-2 rounded-xl relative max-w-[450px]"
              >
                <Video
                  key={video?._id} 
                  video={video}
                  avatar={video?.Uploader?.avatar}
                  username={video?.Uploader?.username}
                  userId={video?.Uploader?._id}
                  dropMenuBar={[
                    {
                      name: likeLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Remove video"
                      ),
                      operation: () =>
                        handleLikes({ userId, videoId: video?._id }),
                    },
                  ]}
                />
              </div>
            ))}
          </ul>
        ) : (
          <VideoNotFound />
        )}
      </div>
    </div>
  );
};

export default LikedVideos;
