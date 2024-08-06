import axios from "axios";
import { HeartIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "@/utils/Video";
import APIError from "@/utils/APIError";
import VideoNotFound from "@/utils/VideoNotFound";
import { useHandleLikes } from "@/hooks/HandleLikes";
import { SkeletonCard } from "@/utils/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { sortVideos } from "@/Services/SortVideos";
import axiosInstance from "@/Redux/api/axiosInstance";

const LikedVideos = () => {
  const { handleLikes, likeLoading } = useHandleLikes();
  const { userId } = useParams();
  const [apiResponse, setApiResponse] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [sortType, setSortType] = useState("new");

  const handleLikedVideos = async () => {
    const response = await axiosInstance.get(
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
    if (userProfileData?.data) {
      setApiResponse(userProfileData.data);
    }
  }, [userProfileData]);

  useEffect(() => {
    if (apiResponse.length) {
      const sorted = sortVideos(apiResponse, sortType);
      setFilteredVideos(sorted);
    }
  }, [apiResponse, sortType]);

  if (likedVideosLoading) {
    return <SkeletonCard cards={15} />;
  }
  if (likedVideosError) {
    return <APIError />;
  }

  return (
    <div className="min-h-screen w-full px-3 space-y-6 bg-white dark:bg-black">
      <div className="w-full flex justify-between items-center">
        <div className="text-2xl flex gap-2 items-center sm:text-3xl py-5 font-mono text-gray-800 dark:text-slate-400 font-semibold">
          <HeartIcon className="size-8 border-none animate-pulse" />
          <p>Favorite Videos :</p>
        </div>
        <select
          onChange={(e) => {
            setSortType(e.target.value);
          }}
          value={sortType}
          className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-800 rounded-md shadow-sm dark:focus:ring-slate-400 transition-colors duration-200 p-1 flex items-center justify-around text-[12px] sm:text-[13px] md:text-[15px]"
        >
          <option value="new">Latest</option>
          <option value="old">Old</option>
          <option value="high-duration">Long Videos</option>
          <option value="low-duration">Short Videos</option>
          <option value="maxViews">Most Viewed</option>
          <option value="minViews">Least Viewed</option>
        </select>
      </div>
      <div className="w-full min-h-auto grid place-items-center">
        {apiResponse.length > 0 ? (
          <ul className="grid w-full gap-2 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div
                  key={video._id}
                  className="border-slate-700 w-full border p-2 rounded-xl relative max-w-[450px]"
                >
                  <Video
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
                          handleLikes({ userId, videoId: video._id }),
                      },
                    ]}
                  />
                </div>
              ))
            ) : (
              <VideoNotFound />
            )}
          </ul>
        ) : (
          <VideoNotFound />
        )}
      </div>
    </div>
  );
};

export default LikedVideos;
