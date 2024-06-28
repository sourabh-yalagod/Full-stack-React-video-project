import axios, { AxiosError } from "axios";
import { Loader2, LucideTrash2, NutOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calclulateVideoTime } from "./CalculateTime";
import APIError from "@/utils/APIError";
import APIloading from "@/utils/APIloading";
const WatchHistory = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [apiResponse, setApiResponse]: any = useState("");
  const [loading, setLoading]: any = useState(false);
  const [error, setError]: any = useState("");

  // API request for watch history videos
  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("Fetching profile for UserId:", userId);
      try {
        setError("");
        const response = await axios.get(
          `/api/v1/users/watch-history/${userId}`
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

  const clearWatchHistory = async () => {
    setLoading(true);
    console.log("Fetching profile for UserId:", userId);
    try {
      setError("");
      const response = await axios.put(`/api/v1/videos/clear-watchhistory`);
      setApiResponse(response?.data?.data);
      console.log("API Response:", apiResponse);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message ?? "Error while API call");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid justify-center w-full p-5 bg-white dark:bg-slate-900 relative">
      {loading && <APIloading />}
      {error && <APIError />}

      <div className="mt-10 w-full min-h-auto grid md:mt-16">
        <button
          className="p-2 border-gray-300 border-[1px] dark:border-slate-700 rounded-xl text-gray-700 dark:text-slate-300 absolute top-3 right-3"
          onClick={clearWatchHistory}
        >
          Clear Watch history
        </button>
        {apiResponse?.videos?.length > 0 ? (
          <ul className="flex justify-center items-start flex-wrap gap-3 py-5">
            {apiResponse?.videos?.map((video: any) => (
              <div
                key={video._id}
                className="flex-1 min-w-[250px] max-w-[380px] border-gray-300 dark:border-slate-700 p-2 rounded-xl border-[1px] relative bg-white dark:bg-slate-800"
              >
                <div className="relative">
                  <video
                    onClick={() => navigate(`/${video._id}`)}
                    className="w-full object-cover rounded-lg cursor-pointer"
                    poster={video.thumbnail}
                    src={video.videoFile}
                  />
                  <div className="absolute bg-black bottom-1 px-1 py-[1px] rounded-lg text-center right-1 text-white text-xs">
                    {Math.floor(video.duration)}
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full overflow-hidden mt-2 relative">
                  <img
                    onClick={() =>
                      navigate(`/signin/user-profile/${apiResponse._id}`)
                    }
                    src={
                      apiResponse.avatar ??
                      "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                    }
                    className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-700 cursor-pointer"
                  />
                  <div className="grid gap-1 pl-1 overflow-hidden">
                    <p className="text-gray-800 dark:text-slate-300 text-[16px] ml-2 overflow-hidden">
                      {video.title?.length > 28 ? (
                        <>{video.title.slice(0, 25)}. . . . .</>
                      ) : (
                        video.title
                      )}
                    </p>
                    <div className="flex gap-3 text-[13px]">
                      <p className="text-gray-600 dark:text-slate-500">
                        {apiResponse.username}
                      </p>
                      <p className="text-gray-600 dark:text-slate-500">
                        views {video.views}
                      </p>
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
          <div className="text-3xl flex gap-5 min-h-screen w-full justify-center items-center mb-11 text-center text-gray-700 dark:text-white my-auto">
            <LucideTrash2 className="text-gray-700 dark:text-white size-12 text-center" />
            <p>Watch history is Empty. . . . .</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchHistory;
