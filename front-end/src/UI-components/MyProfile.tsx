import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bell,
  EllipsisVertical,
  Loader2,
  NutOffIcon,
  Verified,
} from "lucide-react";
import { UserProfileData } from "./UserProfileData";
import { calclulateVideoTime } from "./CalculateTime";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [error, setError]: any = useState("");
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

  if (error) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <h1 className="text-white text-center flex gap-2">
          <NutOffIcon />
          {error.message}
        </h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <h1 className="text-white text-center flex gap-2">
          <Loader2 className="text-2xl text-white animate-spin" />
          "Please wait...."
        </h1>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full grid items-start">
      <div
        className="w-full h-[140px] sm:h-[180px] md:h-[220px] bg-slate-400 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${apiResponse?.coverImage})`,
        }}
      >
        <UserProfileData data={userDetail} />
      </div>
      <div className="w-full flex justify-between md:px-20 lg:px-28 my-5 items-center px-5 gap-3">
        <div className="flex items-center mt-1 justify-around gap-3">
          <div
            className="size-[80px] space-y-2 sm:size-[90px] md:size-[95px] rounded-full border-[2px]  border-white"
            style={{ backgroundImage: `url(${apiResponse?.avatar})` }}
          />
          <div className="grid">
            <p className="text-white text-[18px] sm:text-2xl">
              {apiResponse?.fullname}
            </p>
            <p className="text-gray-500 text-[15px] sm:text-[19px] flex gap-2 items-center">
              @{apiResponse?.username}
              <Verified />
            </p>
            <p className="text-gray-500 text-[15px] sm:text-[19px] flex gap-2 items-center">
              {apiResponse?.subscribers || "0"} - Subscribers
            </p>
          </div>
        </div>
        <button
          onClick={() => handleSubscription()}
          className={`${
            apiResponse?.isSubscribed ? "bg-gray-700" : "bg-red-600 "
          }
             text-white py-1 px-3 rounded-xl sm:text-xl md:text-2xl`}
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
          <ul
            className="grid space-y-1 place-items-start justify-center w-full min-h-screen 
            sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-2 md:m-2 md:min-w-1/3"
          >
            {apiResponse?.videos?.map((video: any) => {
              return (
                <div
                  key={video._id}
                  className="relative z-20 bg-[#212121] min-w-[290px] sm:min-w-1/2 sm:min-w-1/3 p-2 gap-2 rounded-2xl md:min-w-[250px] md:w-full  overflow-hidden"
                >
                  <div className="relative">
                    <video
                      onClick={() => navigate(`/${video._id}`)}
                      className="w-full object-cover"
                      poster={video.thumbnail}
                      controls={false}
                      src={video.videoFile}
                    />
                  </div>
                  <div className="flex py-2 items-center gap- w-full relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-white absolute right-2 bottom-2">
                        <EllipsisVertical className="outline-none" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="text-white p-3 space-y-2 grid border-white rounded-xl text-center w-fit mr-8">
                        <div className="px-2 py-1 rounded-xl bg-slate-900 hover:bg-blue-600 hover:scale-95 transition-all pb-2 active:bg-blue-800">
                          save to watch later
                        </div>
                        <div className="px-2 py-1 rounded-xl hover:bg-red-600 bg-slate-900 hover:scale-95 transition-all pb-2 active:bg-blue-800">
                          delete video
                        </div>
                        <a
                          type="download"
                          className="px-2 py-1 rounded-xl hover:bg-blue-600 hover:scale-95 bg-slate-900 transition-all pb-2 active:bg-blue-800"
                          href={video.videoFile}
                        >
                          download
                        </a>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <img
                      onClick={() =>
                        navigate(`/signin/user-profile/${apiResponse.owner}`)
                      }
                      src={apiResponse?.avatar}
                      className="w-9 h-9 rounded-full border-2 border-white"
                      alt="Avatar"
                    />
                    <div className="text-white grid place-items-start text-[17px] ml-2 overflow-hidden">
                      {video.title.slice(0, 32)}
                      <div className="flex gap-3 text-[12px]">
                        <p className="text-slate-600 ">
                          {apiResponse.username}
                        </p>
                        <p className="text-slate-600 ">views {video.views}</p>
                        <p className="text-slate-600 ">
                          {calclulateVideoTime(video.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                // <Video
                //   key={video.videoFile}
                //   title={video.title}
                //   avatar={video.Owner.avatar}
                //   thumbnail={video.thumbnail}
                //   link={video.videoFile}
                // />
              );
            })}
          </ul>
        ) : (
          <p className="text-3xl text-center text-white">
            <Loader2 className="text-white text-8xl text-center animate-spin mt-10" />
          </p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
