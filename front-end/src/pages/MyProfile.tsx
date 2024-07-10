import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bell,
  EllipsisVertical,
  Loader2,
  Verified,
  Videotape,
} from "lucide-react";
import { UserProfileData } from "../components/UserProfileData";
import Video from "@/utils/Video";
import VideoNotFound from "@/utils/VideoNotFound";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";

interface User {
  fullname: string;
  username: string;
  email: string;
  subscribers: Number;
  likes: any;
  comments: any;
}
const MyProfile = () => {
  const navigate = useNavigate();
  const [apiResponse, setApiResponse]: any = useState("");
  const [subscribe, setSubscribe]: any = useState(false);
  const [loading, setLoading]: any = useState(false);
  const [error, setError]: any = useState(null);
  const [isloading, setIsloading] = useState(false);

  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("Fetching profile for UserId:", userId);
      try {
        setError("");
        const response = await axios.get(
          `/api/v1/user-profiles/user-profile/${userId}`
        );
        setApiResponse(response?.data?.data);
        console.log("API Response:", apiResponse);
      } catch (error) {
        const err = error as AxiosError;
        setError(err.message ?? "Error while API call");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const userDetail: User = {
    fullname: apiResponse ? apiResponse?.fullname : "-",
    username: apiResponse ? apiResponse?.username : "-",
    email: apiResponse ? apiResponse?.email : "-",
    subscribers: apiResponse ? apiResponse?.subscribers : "-",
    likes: apiResponse ? apiResponse?.likes[0]?.totallikes : "-",
    comments: apiResponse ? apiResponse?.comments[0]?.totalComments : "-",
  };

  // functio handles the subscription stistics
  const handleSubscription = useCallback(async () => {
    setSubscribe(!subscribe);
    try {
      const response = await axios.post(`/api/v1/users/handle-subscribers`, {
        subscriptionStatus: subscribe,
        ChannelId: userId,
      });
      console.log("Handle Subscription Response :", response.data.data);
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
    }
  }, [subscribe]);

  // handles the deleting the video
  const deleteVideo = async (videoId: any) => {
    setIsloading(true);
    setError("");
    try {
      const response = await axios.delete(
        `/api/v1/videos/delete-video/${videoId}`
      );
      console.log("Response from Delete Operation : ", response.data.data);
      navigate(0);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError);
      alert(error);
      console.log("Error : ", error ?? "Error while API request...!");
    } finally {
      setIsloading(false);
    }
  };

  // if API results error then this component runs
  if (error) {
    return <VideoNotFound />;
  }

  // while API process/loading this component runs
  if (loading) {
    return <APIloading />;
  }

  if (error) {
    return <APIError />;
  }

  // DOM
  return (
    <div className="mx-auto w-full min-h-screen grid items-start dark:bg-slate-900">
      <div
        className="w-full h-[140px] sm:h-[180px] md:h-[220px] bg-slate-400 dark:bg-slate-700 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${apiResponse?.coverImage})`,
        }}
      >
        <UserProfileData data={userDetail} />
      </div>
      <div className="w-full flex justify-between md:px-20 lg:px-28 my-5 items-center px-5 gap-3 border-[0.2px] border-slate-700 rounded-xl p-3">
        <div className="flex items-center mt-1 justify-around gap-3">
          <div
            className="size-[80px] sm:size-[90px] md:size-[95px] rounded-full border-[2px] border-white dark:border-slate-800"
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
          onClick={() => handleSubscription()}
          className={`${
            apiResponse?.isSubscribed ? "bg-gray-700" : "bg-red-600"
          } text-white py-1 px-3 rounded-xl sm:text-xl md:text-2xl`}
        >
          <p className="flex gap-2 items-center">
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
          <ul className="flex flex-wrap items-center w-full gap-2 justify-center">
            {apiResponse?.videos?.map((video: any) => {
              return (
                <div
                  key={video._id}
                  className="flex-1 min-w-[320px] max-w-[450px] border-slate-700 border p-2 rounded-xl relative"
                >
                  <Video
                    video={video}
                    userId={apiResponse._id}
                    avatar={apiResponse?.avatar}
                    username={apiResponse?.username}
                    playlist={apiResponse.playlist}
                    dropMenuBar={[
                      {
                        name: isloading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Delete Video"
                        ),
                        operation: () => deleteVideo(video._id),
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
          <div className="text-xl mt-24 grid gap-8 justify-center place-items-center text-center text-slate-900 dark:text-white">
            <VideoNotFound />
            <button
              onClick={() => navigate("/signin/upload-video")}
              className="flex gap-4 z-40 text-[17px] items-center bg-slate-600 text-white px-3 py-1 rounded-xl hover:scale-105 transition-all"
            >
              <Videotape />
              Upload Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
