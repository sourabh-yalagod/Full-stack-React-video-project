import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "./Video";
import { Bell, Loader2, Verified } from "lucide-react";
import { UserProfileData } from "./UserProfileData";

interface User {
  fullname: string;
  username: string;
  email: string;
  subscribers: Number;
}
const MyProfile = () => {
  const [result, setResult] = useState([]);
  const [resource, setResourse]: any = useState("");
  const [ProfileFigure, setProfileFigure]:any = useState({});
  const [subscribe, setSubscribe] = useState(false);
  const { userId } = useParams();
  const [profileResource, setProfileResource]:any = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `/api/v1/user-profiles/user-profile/${userId}`
        );
        setResult(response.data.data.profileContent);

        setResourse(response.data.data.profileContent[0].Owner);
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
        console.log("ProfileFigure : ", profileResource);
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
  };
  
  const handleSubscription = async () => {
    setSubscribe(!subscribe);
    try {
      const response = await axios.post(`/api/v1/users/handle-subscribers`, {
        subscriptionStatus: subscribe,
        ChannelId: userId})
        console.log("Response After Subscribing : ",response.data.data);
        setProfileFigure(response.data.data);
    } catch (error:any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
       
    }};
  
  return (
    <div className="mx-auto w-full grid items-start">
      <div
        className="w-full h-[140px] sm:h-[180px] md:h-[220px] bg-slate-400 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${resource.coverImage})`,
        }}
      >
        <UserProfileData data={userDetail} />
      </div>
      <div className="w-full flex justify-between md:justify-around items-center px-5 gap-3">
        <div className="flex items-center mt-1 justify-around gap-3">
          <div
            className="size-[80px] space-y-2 sm:size-[90px] md:size-[95px] rounded-full border-[2px]  border-white"
            style={{ backgroundImage: `url(${resource.avatar})` }}
          />
          <div className="grid">
            <p className="text-white text-[18px] sm:text-2xl">
              {resource.username}
            </p>
            <p className="text-gray-500 text-[15px] sm:text-[19px] flex gap-2 items-center">
              @{resource.username}
              <Verified />
            </p>
            <p className="text-gray-500 text-[15px] sm:text-[19px] flex gap-2 items-center">
              {profileResource.subscriberCount || 0} Subscribers
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
                <Video
                  key={video.videoFile}
                  title={video.title}
                  avatar={video.Owner.avatar}
                  thumbnail={video.thumbnail}
                  link={video.videoFile}
                />
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
