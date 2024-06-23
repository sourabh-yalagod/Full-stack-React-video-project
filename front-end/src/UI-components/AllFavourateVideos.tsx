import axios, { AxiosError } from "axios";
import {
  EllipsisVertical,
  Loader2,
  LucideTrash2,
  NutOffIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calclulateVideoTime } from "./CalculateTime";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatVideoDuration } from "@/Services/FormateVideoDuration";

const AllFavourateVideos = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [apiResponse, setApiResponse]: any = useState("");
  const [loading, setLoading]: any = useState(false);
  const [isLoading, setIsLoading]: any = useState(false);
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
        console.log("API Response for all Favourate Videos :", apiResponse);
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
        <div className="text-3xl flex items-center gap-4 text-center text-slate-700">
          <p>Loading......</p>
          <Loader2 className="text-slate-700 size-12 text-center animate-bounce mt-10" />
        </div>
      </div>
    );
  }

  // remove video from the favourate video list
  const removeVideo = async (videoId: any) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen w-full px-3 bg-white dark:bg-slate-900">
      <h1 className="p-5 underline pt-10 text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white font-semibold">
        Favorite Videos
      </h1>
      <div className="mt-5 w-full min-h-auto grid place-items-center md:mt-16">
        {apiResponse.length > 0 ? (
          <ul className="flex justify-center flex-wrap gap-3 py-5">
            {apiResponse.map((video:any) => (
              <div
                key={video._id}
                className="flex-1 min-w-[320px] max-w-[420px] border-gray-300 dark:border-slate-700 p-2 rounded-xl border-[1px] relative bg-white dark:bg-slate-800"
              >
                <div className="relative">
                  <video
                    onClick={() => navigate(`/${video._id}`)}
                    className="w-full object-cover rounded-lg cursor-pointer"
                    poster={video.thumbnail}
                    src={video.videoFile}
                  />
                  <div className="absolute bg-black bottom-1 px-1 py-[1px] rounded-lg text-center right-1 text-white text-xs">
                    {formatVideoDuration(video.duration)}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-800 dark:text-white absolute right-2 bottom-[5%] z-10 cursor-pointer">
                    <EllipsisVertical className="outline-none" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="text-gray-800 dark:text-white text-[13px] grid space-y-1 border-gray-300 dark:border-slate-600 bg-opacity-50 cursor-pointer rounded-[7px] bg-white dark:bg-slate-900 text-center w-fit mr-8 p-0">
                    <div
                      onClick={() => removeVideo(video._id)}
                      className="px-2 py-1 m-1 rounded-[9px] transition-all grid place-items-center pb-2 hover:bg-gray-200 dark:hover:bg-slate-800"
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : 'Remove video'}
                    </div>
                    <a
                      type="download"
                      className="px-2 py-1 m-1 rounded-[9px] transition-all pb-2 hover:bg-gray-200 dark:hover:bg-slate-800"
                      href={video.videoFile}
                    >
                      Download
                    </a>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-2 w-full overflow-hidden mt-2 relative">
                  <img
                    onClick={() => navigate(`/signin/user-profile/${video.owner}`)}
                    src={
                      video?.Uploader?.avatar ??
                      'https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg'
                    }
                    className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-700 cursor-pointer"
                    alt=""
                  />
                  <div className="grid gap-1 pl-1 overflow-hidden">
                    <p className="text-gray-800 dark:text-slate-300 text-[16px] ml-2 overflow-hidden">
                      {video.title.length > 28 ? (
                        <>{video.title.slice(0, 28)}. . . . .</>
                      ) : (
                        video.title
                      )}
                    </p>
                    <div className="flex gap-3 text-[13px]">
                      <p className="text-gray-600 dark:text-slate-500">
                        {video.Uploader.username}
                      </p>
                      <p className="text-gray-600 dark:text-slate-500">views {video.views}</p>
                      <p className="text-gray-600 dark:text-slate-500">
                        {calclulateVideoTime(video.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <div className="text-3xl flex gap-5 min-h-screen w-full justify-center items-center mb-11 text-center text-gray-800 dark:text-slate-700 my-auto">
            <LucideTrash2 className="text-gray-800 dark:text-slate-700 size-12 text-center" />
            <p>No videos . . . . .</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFavourateVideos;
