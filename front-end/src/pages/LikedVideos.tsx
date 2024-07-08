import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "@/utils/Video";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";
import VideoNotFound from "@/utils/VideoNotFound";
import { useHandleLikes } from "@/hooks/HandleLikes";
const LikedVideos = () => {
  const { handleLikes } = useHandleLikes();
  const { userId } = useParams();
  const [apiResponse, setApiResponse]: any = useState("");
  const [loading, setLoading]: any = useState(false);
  const [isLoading, setIsLoading]: any = useState(false);
  const [error, setError]: any = useState("");

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

  return (
    <div className="min-h-screen w-full px-3 bg-white dark:bg-slate-900">
      {loading && <APIloading />}
      {error && <APIError />}
      <h1 className="p-5 underline pt-10 text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white font-semibold">
        Favorite Videos
      </h1>
      <div className="mt-5 w-full min-h-auto grid place-items-center md:mt-16">
        {apiResponse.length > 0 ? (
          <ul className="flex flex-wrap items-center w-full gap-2 justify-center">
            {apiResponse.map((video: any) => (
              <div
                key={video._id}
                className="flex-1 min-w-[320px] max-w-[450px] border-slate-700 border p-2 rounded-xl relative"
              >
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
                      operation: () =>
                        handleLikes({ userId, videoId: video._id }),
                    },
                  ]}
                />
              </div>
            ))}
          </ul>
        ) : (
          <VideoNotFound />
        )}
      </div>
    </div>
  );
};

export default LikedVideos;
