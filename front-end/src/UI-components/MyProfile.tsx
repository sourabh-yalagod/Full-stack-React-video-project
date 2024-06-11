import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bell, Loader2, Verified } from "lucide-react";
import { UserProfileData } from "./UserProfileData";

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
  const [result, setResult]: any = useState([]);
  const [ProfileFigure, setProfileFigure]: any = useState({});
  const [subscribe, setSubscribe] = useState(false);
  const [likes, setLikes]: any = useState("");
  const [comments, setComments]: any = useState("");
  const { userId } = useParams();
  const [profileResource, setProfileResource]: any = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `/api/v1/user-profiles/user-profile/${userId}`
        );
        setResult(response.data.data.profileContent);
        setLikes(response.data.data.Likes[0].TotalLikes);
        setComments(response.data.data.Comments[0].TotalComments);
        console.log("Result : ", response);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    })();
  }, [userId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `/api/v1/users/get-user-detail/${userId}`
        );
        setProfileFigure(response.data.data);

        setProfileResource(response.data.data);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    })();
  }, [userId]);

  const userDetail: User = {
    fullname: profileResource.fullname,
    username: profileResource.username,
    email: profileResource.email,
    subscribers: profileResource.subscriberCount,
    likes: likes ? likes : "0",
    comments: comments ? comments : "0",
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

  return (
    <div className="mx-auto w-full grid items-start">
      <div
        className="w-full h-[140px] sm:h-[180px] md:h-[220px] bg-slate-400 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${profileResource.coverImage})`,
        }}
      >
        <UserProfileData
          data={userDetail}
          subscribeStatus={profileResource.isSubscribed}
        />
      </div>
      <div className="w-full flex justify-between md:px-20 lg:px-28 my-5 items-center px-5 gap-3">
        <div className="flex items-center mt-1 justify-around gap-3">
          <div
            className="size-[80px] space-y-2 sm:size-[90px] md:size-[95px] rounded-full border-[2px]  border-white"
            style={{ backgroundImage: `url(${profileResource.avatar})` }}
          />
          <div className="grid">
            <p className="text-white text-[18px] sm:text-2xl">
              {profileResource.username}
            </p>
            <p className="text-gray-500 text-[15px] sm:text-[19px] flex gap-2 items-center">
              @{profileResource.username}
              <Verified />
            </p>
            <p className="text-gray-500 text-[15px] sm:text-[19px] flex gap-2 items-center">
              {profileResource.subscriberCount || 0} - Subscribers
            </p>
          </div>
        </div>
        <button
          onClick={() => handleSubscription()}
          className={`${
            ProfileFigure.isSubscribed ? "bg-gray-700" : "bg-red-600 "
          }
             text-white py-1 px-3 rounded-xl sm:text-xl md:text-2xl`}
        >
          <p className="flex gap-2 items-center">
            Subscribe
            {ProfileFigure.isSubscribed ? (
              <Bell className="size-4 sm:size-6 md:size-8" />
            ) : (
              ""
            )}
          </p>
        </button>
      </div>

      <div className="mt-5 md:mt-4 w-full min-h-auto grid place-items-center px-5">
        {result.length > 0 ? (
          <ul
            className="grid space-y-1 place-items-start justify-center w-full min-h-screen 
            sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-2 md:m-2 md:min-w-1/3"
          >
            {result.map((video: any) => {
              return (
                <div
                  key={video.videoFile}
                  className="relative z-20 bg-[#212121] min-w-[290px] sm:min-w-1/2 sm:min-w-1/3 p-2 gap-2 rounded-2xl md:min-w-[250px] md:w-full  overflow-hidden"
                >
                  <div className="relative">
                    <video
                      onPlay={() => navigate(`/${video._id}`)}
                      className="w-full object-cover"
                      poster={video.thumbnail}
                      controls
                      src={video.videoFile}
                    />
                  </div>
                  <div className="flex items-center gap-1 w-full overflow-scroll mt-2">
                    <img
                      src={video.Owner.avatar}
                      className="w-9 h-9 rounded-full border-2 border-white"
                      alt="Avatar"
                    />
                    <p className="text-white text-[16px] ml-2 overflow-hidden">
                      {video.title.slice(0, 32)}
                    </p>
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
