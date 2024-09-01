import { useParams } from "react-router-dom";
import Video from "@/utils/Video";
import APIError from "@/utils/APIError";
import VideoNotFound from "@/utils/VideoNotFound";

import Channel from "@/components/Channel";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SkeletonCard } from "@/utils/Skeleton";
import axiosInstance from "@/Redux/api/axiosInstance";

const Subscription = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient()
  const handleSubscription = async () => {
    const response = await axiosInstance.get(
      `/api/v1/users/subscriptions-status/${userId}`
    );
    return response?.data;
  };
  const {
    data: apiResponse,
    isPending: loading,
    error,
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: handleSubscription,
    // 
  });

  if (loading) {
    return <SkeletonCard cards={15} />;
  }
  if (error) {
    return <APIError />;
  }
  return (
    <div className="min-h-screen px-2 pl-4 w-full py-10 grid bg-gray-100 dark:bg-black relative">
      <p className="text-slate-700 dark:text-slate-300 text-xl text-left py-2 sm:text-2xl md:text-3xl lg:text-4xl">
        Channel You Subscribed
      </p>
      <hr className="py-4" />
      <div className="relative w-full overflow-hidden mb-5 mx-auto dark:text-white rounded-xl">
        <div className="flex whitespace-nowrap animate-scroll">
          {apiResponse?.data?.Channels?.map((channel) => (
            <div key={channel._id} className="flex-shrink-0">
              <Channel
                username={channel?.Channel?.username ?? ""}
                fullname={channel?.Channel?.fullname ?? ""}
                channelId={channel.channel}
                avatar={
                  channel?.Channel?.avatar ??
                  "https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
                }
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="py-4" />
      {apiResponse?.data?.videos?.length > 0 ? (
        <ul className="grid w-full gap-2 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apiResponse?.data?.videos.map((video) => {
            return (
              <div
                key={video?._id + Math.random()}
                className="flex-1 w-full max-w-[450px] border-slate-700 border p-2 rounded-xl relative"
              >
                <Video
                  video={video?.video}
                  avatar={video?.video?.Uploader?.avatar}
                  username={video?.video?.Uploader?.username}
                  userId={video?.video?.Uploader?.userId}
                />
              </div>
            );
          })}
        </ul>
      ) : (
        <VideoNotFound />
      )}
    </div>
  );
};

export default Subscription;
