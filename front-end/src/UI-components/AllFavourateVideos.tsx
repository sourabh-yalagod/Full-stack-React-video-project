import axios, { AxiosError } from "axios";
import {
  Loader2,
  NutOffIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "@/utils/Video";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";
import VideoNotFound from "@/utils/VideoNotFound";

const AllFavourateVideos = () => {
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


  return (
    <div className="min-h-screen w-full px-3 bg-white dark:bg-slate-900">
      {loading && <APIloading />}
      {error && <APIError />}
      <h1 className="p-5 underline pt-10 text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white font-semibold">
        Favorite Videos
      </h1>
      <div className="mt-5 w-full min-h-auto grid place-items-center md:mt-16">
        {apiResponse.length > 0 ? (
          <ul className="flex justify-center flex-wrap gap-3 py-5">
            {apiResponse.map((video: any) => (
              <Video
              key={video._id} // Ensure this is unique and stable
              video={video}
              avatar={video?.Uploader?.avatar}
              username={video?.Uploader?.username}
              userId={video.Uploader._id}
              dropMenuBar={[
                {
                  name: isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Remove video"
                  ),
                  operation: () => removeVideo(video._id),
                },
              ]}
            />
            ))}
          </ul>
        ) : (
          <VideoNotFound />
        )}
      </div>
    </div>
  );
};

export default AllFavourateVideos;
