import axios, { AxiosError } from "axios";
import { HeartIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "@/utils/Video";
import APIError from "@/utils/APIError";
import VideoNotFound from "@/utils/VideoNotFound";
import { useHandleLikes } from "@/hooks/HandleLikes";
import { SkeletonCard } from "@/utils/Skeleton";
const LikedVideos = () => {
  const { handleLikes , likeLoading } = useHandleLikes();
  const { userId } = useParams();
  const [apiResponse, setApiResponse]: any = useState("");
  const [loading, setLoading]: any = useState(false);
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
  }, []);

  if (loading) {
    return <SkeletonCard />;
  }
  if (error) {
    return <APIError />;
  }
  return (
    <div className="min-h-screen w-full px-3 space-y-6 bg-white dark:bg-slate-900">
      <div className="text-2xl flex gap-2 items-center sm:text-3xl py-5 font-mono text-gray-800 dark:text-slate-400 font-semibold">
        <HeartIcon className="size-8 border-none animate-pulse"/><p>Favorite Videos :</p>
      </div>
      <div className="w-full min-h-auto grid place-items-center">
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
                      name: likeLoading ? (
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
