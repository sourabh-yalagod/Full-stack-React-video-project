import axios, { AxiosError } from "axios";
import { Loader2, NutOffIcon, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Video from "@/utils/Video";
import VideoNotFound from "@/utils/VideoNotFound";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";
import { getUserId } from "@/Services/Auth";

const PlaylistVideos = () => {
  const { playlistId } = useParams();
  const [apiResponse, setApiResponse]: any = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isloading, setIsLoading]: any = useState(false);
  const [error, setError]: any = useState("");
  const navigate = useNavigate();
  const userId = getUserId().userId || localStorage.getItem("userId");
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
        setLoading(false);
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
          <ul className="flex flex-wrap items-center w-full gap-2 justify-center relative">
            {apiResponse?.videos?.map((video: any) => (
              <div
                key={video._id}
                className="flex-1 min-w-[320px] max-w-[450px] border-slate-700 border p-2 rounded-xl relative"
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
          <div className="relative grid place-items-center">
            <VideoNotFound />
            <p
              onClick={() => navigate(`/signin/user-profile/${userId}`)}
              className="flex gap-3 absolute inset-y-40 border p-5 rounded-xl hover:bg-blue-600 hover:text-white transition-all hover:border-none items-center text-center text-slate-800 dark:text-slate-300 cursor-pointer"
            >
              <PlusCircle />
              Add Videos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistVideos;
