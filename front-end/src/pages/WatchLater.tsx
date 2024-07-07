import axios, { AxiosError } from "axios";
import {
  Loader,
  LucideTrash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "@/utils/Video";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";

const WatchLaterVideos = () => {
  const { userId } = useParams();
  const [apiResponse, setApiResponse]: any = useState("");
  const [loading, setLoading]: any = useState(false);
  const [isloading, setIsLoading]: any = useState(false);
  const [error, setError]: any = useState("");
  const [done, setDone] = useState(false);
  console.log(userId);

  // Api request for watch-later videos
  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("Fetching profile for UserId:", userId);
      try {
        setError("");
        const response = await axios.get(
          `/api/v1/users/all-watch-later-videos/${userId}`
        );
        setDone(false);
        setApiResponse(response?.data?.data);
        console.log("API Response:", apiResponse);
      } catch (error) {
        const err = error as AxiosError;
        setError(err.message ?? "Error while API call");
        setDone(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, done]);

  // function to remove a video from watch later List
  const removeFromWatchLaterList = async (videoId: any) => {
    console.log("Clicked . . . . . !");

    try {
      setIsLoading(true);
      setError("");
      const response = await axios.patch(
        `/api/v1/users/remove-watch-later-video`,
        {
          videoId,
        }
      );
      setApiResponse(response?.data?.data);
      console.log(
        "Response from remove a video from watch later list :",
        apiResponse
      );
      setDone(true);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message ?? "Error while API call");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full px-3 bg-#121212 pt-16 relative dark:bg-slate-900">
      {loading && <APIloading />}
      {error && <APIError />}
      <div>
        <h1 className="text-center text-white text-2xl font-black">
          Watch Later Videos
        </h1>
        {apiResponse?.watchLaterVideos?.length > 0 ? (
          <ul className="flex justify-center flex-wrap gap-3 py-5">
            {apiResponse?.watchLaterVideos?.map((video: any) => {
              return (
                <Video
                  key={video._id}
                  video={video}
                  userId={"" || video.owner}
                  avatar={apiResponse?.avatar}
                  username={apiResponse?.username}
                  dropMenuBar={[
                    {
                      name: isloading? <Loader className="animate-spin"/>:"Remove Video",
                      operation: () => removeFromWatchLaterList(video._id),
                    },
                  ]}
                />
              );
            })}
          </ul>
        ) : (
          <div className="text-3xl flex gap-5 min-h-screen w-full justify-center items-center mb-11 text-center text-slate-600 my-auto">
            <LucideTrash2 className="size-12 text-center" />
            <p>No videos . . . . .</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchLaterVideos;
