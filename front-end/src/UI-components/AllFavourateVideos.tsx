import axios, { AxiosError } from "axios";
import { EllipsisVertical, Loader2, NutOffIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calclulateVideoTime } from "./CalculateTime";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AllFavourateVideos = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [apiResponse, setApiResponse]: any = useState("");
  const [loading, setLoading]: any = useState(false);
  const [error, setError]: any = useState("");
  console.log(userId);
  const [likeResponse, setLikeResponse]: any = useState("");

  // call the API on userId change
  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("Fetching profile for UserId:", userId);
      try {
        setError("");
        const response = await axios.get(
          `/api/v1/likes/all-favourate-videos/${userId}`
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
  }, [userId]);

  // loading state while API response return
  if (loading) {
    return (
      <div className="min-h-screen w-full px-3 bg-#121212 grid place-items-center">
        <div className="text-3xl flex gap-4 text-center text-white">
          <p>Loading......</p>
          <Loader2 className="text-white size-12 text-center animate-bounce mt-10" />
        </div>
      </div>
    );
  }

  // remove video from the favourate video list
  const removeVideo = async (videoId: any) => {
    try {
      const response = await axios.post(
        `/api/v1/likes/toggle-like-status/${videoId}`,
        {
          userId,
        }
      );
      setLikeResponse(response.data.data);
      console.log("likeResponse : ", likeResponse);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError);
    }
  };

  // error display if the API call gone wrong
  if (error) {
    return (
      <div className="min-h-screen w-full px-3 bg-#121212 grid place-items-center">
        <div className="text-white text-3xl flex gap-4">
          <NutOffIcon />
          APi Error Try again . . . .
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-3 bg-#121212">
      <h1 className="text-center mt-10 text-2xl sm:text-3xl md:text-4xl text-white font-semibold">
        Favourate Videos
      </h1>
      <div className="mt-5 w-full min-h-auto grid place-items-center md:mt-16">
        {apiResponse.length > 0 ? (
          <ul
            className="mt-8 grid place-items-start space-y-2 justify-center w-full min-h-screen 
            sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-2 md:m-3 md:min-w-1/3"
          >
            {apiResponse.map((video: any) => {
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
                      src={video.videoFile}
                    />
                    <div className="absolute bg-black bottom-1 px-1 py-[1px] rounded-lg text-center right-1 text-white">
                      {Math.floor(video.duration)}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-white absolute right-2 bottom-[5%] z-10 cursor-pointer">
                      <EllipsisVertical className="outline-none" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-white text-[13px] grid space-y-1 border-white cursor-pointer rounded-[7px] bg-slate-800 text-center w-fit mr-8 p-0">
                      <div
                        onClick={() => removeVideo(video._id)}
                        className="py-1 px-2 hover:bg-slate-900 transition-all bg-opacity-15 pb-2"
                      >
                        Remove video
                      </div>
                      <a
                        type="download"
                        className="py-1 px-2 hover:bg-slate-900 transition-all bg-opacity-15 pb-2"
                        href={video.videoFile}
                      >
                        Download
                      </a>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex items-center gap-1 w-full overflow-scroll mt-2 relative">
                    <img
                      onClick={() =>
                        navigate(`/signin/user-profile/${video.Uploader._id}`)
                      }
                      src={video?.Uploader?.avatar}
                      className="w-9 h-9 rounded-full border-2 border-white"
                      alt="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                    />
                    <div className="grid gap-1 pl-1">
                      <p className="text-white text-[16px] ml-2 overflow-hidden">
                        {video.title.length > 28 ? (
                          <>{video.title.slice(0, 25)}. . . . .</>
                        ) : (
                          video.title
                        )}
                      </p>
                      <div className="flex gap-3 text-[13px]">
                        <p className="text-slate-600 ">
                          {video.Uploader.username}
                        </p>
                        <p className="text-slate-600 ">views {video.views}</p>
                        <p className="text-slate-600 ">
                          {calclulateVideoTime(video.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        ) : (
          <div className="text-2xl flex gap-10 item-center text-center mt-11 text-white">
            <p>No videos Found . . . . . .</p>
            <Trash className="text-white size-12 text-center animate-bounce" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFavourateVideos;
