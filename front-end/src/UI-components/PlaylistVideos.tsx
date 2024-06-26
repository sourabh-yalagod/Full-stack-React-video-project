import axios, { AxiosError } from "axios";
import { Loader2, NutOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Video from "@/utils/Video";
import VideoNotFound from "@/utils/VideoNotFound";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";

const PlaylistVideos = () => {
  const { playlistId } = useParams();
  const [apiResponse, setApiResponse]: any = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isloading, setIsLoading]: any = useState(false);
  const [error, setError]: any = useState("");

  // Api request for watch-later videos
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        setError("");
        const response = await axios.get(
          `/api/v1/video-play-list/all-playlist-videos/${playlistId}`
        );
        setApiResponse(response?.data?.data);
        console.log("API Response for Playlist Videos :", apiResponse);
      } catch (error) {
        const err = error as AxiosError;
        setError(err.message ?? "Error while API call");
      } finally {
        setLoading(true);
      }
    })();
  }, [playlistId]);

  const removeVideoFromPlaylist = async (
    videoId: string,
    playlistId: string | undefined
  ) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.delete(
        `/api/v1/video-play-list/delete-video/${videoId}/${playlistId}`
      );
      console.log(
        "Response for deleting a video from Playlist : ",
        response.data.data
      );
      // navigate(0)
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full px-3 bg-white dark:bg-slate-900 pt-16 relative">
      {loading && <APIloading />}
      {error && <APIError />}
      <div>
        <h1 className="text-center text-gray-800 dark:text-white text-2xl font-black">
          Playlist Videos
        </h1>
        {apiResponse?.videos?.length > 0 ? (
          <ul className="flex justify-center flex-wrap gap-3 py-5">
            {apiResponse?.videos?.map((video: any) => (
              <div
                key={video._id}
                className="flex-1 min-w-[320px] max-w-[500px] dark:border-slate-700 p-2 rounded-xl relative"
              >
                <Video
                  video={video}
                  userId={video?.owner?._id}
                  username={video?.owner?.username}
                  avatar={video?.owner?.avatar}
                  dropMenuBar={[
                    {
                      name: isloading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Remove video"
                      ),
                      operation: () =>
                        removeVideoFromPlaylist(video?._id, playlistId),
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

export default PlaylistVideos;
