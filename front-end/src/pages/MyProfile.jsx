import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bell,
  EllipsisVertical,
  Loader,
  Loader2,
  Verified,
  Videotape,
} from "lucide-react";
import { UserProfileData } from "../components/UserProfileData";
import Video from "@/utils/Video";
import VideoNotFound from "@/utils/VideoNotFound";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SkeletonCard } from "@/utils/Skeleton";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/Redux/api/axiosInstance";

const MyProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState("");

  const { userId } = useParams();
  
  const handleUserProfile = async () => {
    const response = await axiosInstance.get(
      `/api/v1/user-profiles/user-profile/${userId}`
    );
    return response?.data;
  };

  const {
    data: userProfileData,
    isPending: userProfileDataLoading,
    error: userProfileDataError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: handleUserProfile,
  });
  useEffect(() => {
    setApiResponse(userProfileData?.data);
  }, [userProfileData]);

  const userDetail = {
    fullname: apiResponse ? apiResponse?.fullname : "-",
    username: apiResponse ? apiResponse?.username : "-",
    email: apiResponse ? apiResponse?.email : "-",
    subscribers: apiResponse ? apiResponse?.subscribers : "-",
    likes: apiResponse ? apiResponse?.likes[0]?.totallikes : "-",
    comments: apiResponse ? apiResponse?.comments[0]?.totalComments : "-",
  };

  // function to handles the subscription stistics

  const handleSubscription = async ({userId }) => {
    const response = await axiosInstance.post(`/api/v1/users/handle-subscribers`, {
      // subscriptionStatus: subscribe,
      ChannelId: userId,
    });
    return response?.data;
  };

  const subscriptionMutation = useMutation({
    mutationFn: handleSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast({
        title: "Subscription handled Successfully . . . . !",
        variant: "default",
        duration: 1200,
      });
    },
    onError: (error) => {
      toast({
        title: "Error while fetching user Profile data . . .  . . . !",
        description: error?.message,
        variant: "destructive",
        duration: 1200,
      });
    },
  });

  const deleteVideo = async ({ videoId }) => {
    const response = await axiosInstance.delete(
      `/api/v1/videos/delete-video/${videoId}`
    );
    return response?.data;
  };

  const deleteVideoMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast({
        title: "Video deleted Succesfully",
        variant: "default",
        duration: 1200,
      });
    },
    onError: (error) => {
      toast({
        title: "Error while deleting the video . . .  . . . !",
        description: error?.message,
        variant: "destructive",
        duration: 1200,
      });
    },
  });

  if (userProfileDataError) {
    return <APIError />;
  }

  if (userProfileDataLoading) {
    return <SkeletonCard cards={10} />;
  }

  return (
    <div className="mx-auto w-full min-h-scree grid items-start dark:bg-black">
      <div
        className="w-full h-[140px] sm:h-[180px] md:h-[220px] dark:dark:bg-black bg-white bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${apiResponse?.coverImage})`,
        }}
      >
        <UserProfileData data={userDetail} />
      </div>
      <div className="w-full flex justify-between md:px-20 lg:px-28 my-5 items-center px-5 gap-3 border-[0.2px] border-slate-700 rounded-xl p-3">
        <div className="flex items-center mt-1 justify-around gap-3">
          <div
            className="size-[80px] bg-center bg-cover sm:size-[90px] md:size-[95px] rounded-full border-[2px] border-white dark:border-slate-800"
            style={{ backgroundImage: `url(${apiResponse?.avatar})` }}
          />
          <div className="grid">
            <p className="text-slate-900 dark:text-white text-[18px] sm:text-2xl">
              {apiResponse?.fullname}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-[15px] sm:text-[19px] flex gap-2 items-center">
              @{apiResponse?.username}
              <Verified />
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-[15px] sm:text-[19px] flex gap-2 items-center">
              {apiResponse?.subscribers || "0"} - Subscribers
            </p>
          </div>
        </div>
        <button
          onClick={() => subscriptionMutation.mutate({ userId })}
          className={`${
            apiResponse?.isSubscribed ? "bg-gray-700" : "bg-red-600"
          } text-white py-1 px-3 rounded-xl sm:text-xl md:text-2xl`}
        >
          <p className="flex gap-2 items-center">
            {subscriptionMutation.isPending && (
              <Loader className="animate-spin" />
            )}
            Subscribe
            {apiResponse?.isSubscribed ? (
              <Bell className="size-4 sm:size-6 md:size-8" />
            ) : (
              ""
            )}
          </p>
        </button>
      </div>
      <div className="mt-5 md:mt-4 w-full min-h-auto grid place-items-center px-5">
        {apiResponse?.videos?.length > 0 ? (
          <ul className="grid w-full gap-2 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {apiResponse?.videos?.map((video) => {
              return (
                <div
                  key={video._id}
                  className="border-slate-700 w-full border p-2 rounded-xl relative max-w-[450px]"
                >
                  <Video
                    video={video}
                    userId={apiResponse._id}
                    avatar={apiResponse?.avatar}
                    username={apiResponse?.username}
                    playlist={apiResponse.playlist}
                    dropMenuBar={[
                      {
                        name: deleteVideoMutation.isPending ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Delete Video"
                        ),
                        operation: () =>
                          deleteVideoMutation.mutate({ videoId: video?._id }),
                      },
                      {
                        name: "Add-video To playlist",
                      },
                    ]}
                  />
                </div>
              );
            })}
          </ul>
        ) : (
          <div className="text-xl pt-5 grid justify-center place-items-center text-center text-slate-900 dark:text-white">
            <VideoNotFound>
              <button
                onClick={() => navigate("/signin/upload-video")}
                className="flex gap-4 absolute text-[17px] items-center border text-white px-3 py-1 rounded-xl hover:scale-105 transition-all"
              >
                <Videotape />
                Upload Video
              </button>
            </VideoNotFound>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
