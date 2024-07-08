import axios, { AxiosError } from "axios";
import { LucideTrash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calclulateVideoTime } from "@/Services/CalculateTime";
import APIError from "@/utils/APIError";
import APIloading from "@/utils/APIloading";
import Video from "@/utils/Video";
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
          <ul className="flex flex-wrap items-center w-full gap-2 justify-center">
            {apiResponse?.videos?.map((video: any) => (
              <div
                key={video._id}
                className="flex-1 min-w-[320px] max-w-[450px] border-slate-700 border p-2 rounded-xl relative"
              >
                 <Video
                  video={video}
                  userId={video?.owner}
                  avatar={apiResponse?.avatar}
                  username={apiResponse?.username}
                />
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
