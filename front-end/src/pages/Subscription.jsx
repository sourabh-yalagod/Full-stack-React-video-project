import axios from "axios";
import { useParams } from "react-router-dom";
import Video from "@/utils/Video";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";
import VideoNotFound from "@/utils/VideoNotFound";

import Channel from "@/components/Channel";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "@/utils/Skeleton";
import axiosInstance from "@/Redux/api/axiosInstance";

const Subscription = () => {
  const { userId } = useParams();

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
    staleTime: 5 * 60 * 1000,
  });

  if (loading) {
    return <SkeletonCard cards={15} />;
  }
  if (error) {
    return <APIError />;
  }
  return (
    <div className="min-h-screen px-2 pl-4 w-full py-10 grid place-items-center bg-gray-100 dark:bg-black relative">
      <p className="text-slate-700 dark:text-slate-300 text-xl py-2 text-center underline sm:text-2xl md:text-3xl lg:text-4xl">
        Channel You Subscribed
      </p>
      <div className="w-auto justify-center items-center flex mb-5 p-5 overflow-x-auto mx-auto px-5 dark:text-white border border-slate-600 rounded-xl">
        {apiResponse?.data?.Channels?.map((channel) => (
          <div key={channel._id}>
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
      {apiResponse?.data?.videos?.length > 0 ? (
        <ul className="grid w-full gap-2 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apiResponse?.data?.videos.map((video) => {
            return (
              <div
                key={video?._id + Math.random()}
                className="border-slate-700 w-full border p-2 rounded-xl relative max-w-[450px]"
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
