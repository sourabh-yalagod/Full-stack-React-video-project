import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bell, Loader2, NotebookPen, NutOffIcon, Verified, Videotape } from "lucide-react";
import { UserProfileData } from "./UserProfileData";
import Video from "@/utils/Video";

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

  // function handled the adding videos to playlist
  const addToPlaylist = async (videoId: string, playlistId: string) => {
    console.log(videoId, playlistId);

    try {
      setIsloading(true);
      setError("");
      const response = await axios.patch(
        `/api/v1/video-play-list/new-video/${videoId}/${playlistId}`
      );
      console.log("API Response for playlist:", response.data);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message ?? "Error while API call");
    } finally {
      setIsloading(false);
    }
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
    return (
      <div className="w-full h-screen grid place-items-center">
        <h1 className="text-white text-center flex gap-2">
          <NutOffIcon />
          {error}
        </h1>
      </div>
    );
  }

  // while API process/loading this component runs
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

  // DOM
  return (
    <div className="mx-auto w-full grid items-start dark:bg-slate-900">
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
          <ul className="flex justify-center items-start flex-wrap gap-3 py-5">
            {apiResponse?.videos?.map((video: any) => {
              return (
                <div
                  key={video._id}
                  className="flex-1 min-w-[350px] borde-[1px] max-w-[400px] p-2 rounded-xl relative"
                >
                  {/* <div className="relative">
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
                      <DropdownMenuTrigger className="text-slate-900 dark:text-white absolute right-2 bottom-2">
                        <EllipsisVertical className="outline-none" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="text-slate-900 dark:text-white relative text-[13px] grid space-y-1 border-slate-600 dark:border-slate-800 bg-opacity-50 cursor-pointer rounded-[7px] bg-slate-100 dark:bg-slate-900 text-center w-fit mr-8 p-0">
                        <div className="px-2 py-1 m-1 rounded-[9px] grid place-items-center transition-all pb-2 hover:bg-slate-300 dark:hover:bg-slate-800">
                          Save to watch-later
                        </div>
                        {userId == localStorage.getItem("userId") ? (
                          <div
                            onClick={() => deleteVideo(video._id)}
                            className="px-2 py-1 m-1 grid place-items-center rounded-[9px] transition-all pb-2 hover:bg-slate-300 dark:hover:bg-slate-800"
                          >
                            {isloading ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              "Delete video"
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                        <a
                          type="download"
                          className="px-2 py-1 m-1 rounded-[9px] grid place-items-center transition-all pb-2 hover:bg-slate-300 dark:hover:bg-slate-800"
                          href={video.videoFile}
                        >
                          Download
                        </a>
                        <div className="px-2 py-1 m-1 rounded-[9px] grid place-items-center transition-all pb-2 hover:bg-slate-300 dark:hover:bg-slate-800">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="text-slate-900 dark:text-white">
                              Add to playlist
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="absolute right-0 bottom-0 text-slate-900 dark:text-white text-[13px] grid space-y-1 border-slate-600 dark:border-slate-800 bg-opacity-50 cursor-pointer rounded-[7px] bg-slate-100 dark:bg-slate-900 text-center w-fit mr-8 p-0">
                              {apiResponse.playlist.map((list: any) => (
                                <div
                                  onClick={() =>
                                    addToPlaylist(video._id, list._id)
                                  }
                                  className="px-2 py-1 m-1 rounded-[9px] grid place-items-center transition-all pb-2 hover:bg-slate-300 dark:hover:bg-slate-800"
                                  key={list._id}
                                >
                                  {list.title.length > 25
                                    ? `${list.title.slice(0, 25)}. . . .`
                                    : `${list.title}`}
                                </div>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <img
                      onClick={() =>
                        navigate(`/signin/user-profile/${apiResponse.owner}`)
                      }
                      src={apiResponse?.avatar}
                      className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800"
                      alt="Avatar"
                    />
                    <div className="text-slate-900 dark:text-white grid place-items-start text-[15px] ml-2 overflow-hidden">
                      <p>
                        {video.title.length > 25
                          ? `${video.title.slice(0, 25)}. . . .`
                          : `${video.title}`}
                      </p>
                      <div className="flex gap-3 text-[12px] text-slate-600 dark:text-slate-400">
                        <p>{apiResponse.username}</p>
                        <p>views {video.views}</p>
                        <p>{calclulateVideoTime(video.createdAt)}</p>
                      </div>
                    </div>
                  </div> */}
                  <Video
                    video={video}
                    userId={apiResponse._id}
                    avatar={apiResponse?.avatar}
                    username={apiResponse?.username}
                    dropMenuBar={[
                      {
                        name: isloading?<Loader2 className="animate-spin"/>:"Delete Video",
                        operation: () => deleteVideo(video._id),
                      },
                      
                    ]}
                  />
                </div>
              );
            })}
          </ul>
        ) : (
          <div className="text-xl grid gap-8 justify-center place-items-center text-center text-slate-900 dark:text-white">
            <Loader2 className="text-slate-900 dark:text-white text-8xl text-center animate-spin mt-10" />
            <p className="flex items-center gap-3">
              <NotebookPen />
              No videos Found . . . . . .!
            </p>
            <button
              onClick={() => navigate("/signin/upload-video")}
              className="flex gap-4 text-[17px] items-center bg-slate-600 dark:bg-slate-800 text-white px-3 py-1 rounded-xl hover:scale-105 transition-all"
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
