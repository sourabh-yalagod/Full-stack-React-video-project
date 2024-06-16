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
import { SideMenuBar } from "./SideBarMenu";

const PlaylistVideos = () => {
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const [apiResponse, setApiResponse]: any = useState("");
  const [loading, setLoading]: any = useState(false);
  const [isloading, setIsLoading]: any = useState(false);
  const [error, setError]: any = useState("");

  // Api request for watch-later videos
  useEffect(() => {
    (async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    })();
  }, [playlistId]);

  const removeVideoFromPlaylist = async (videoId:string,playlistId:string | undefined) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.delete(`/api/v1/video-play-list/delete-video/${videoId}/${playlistId}`)
      console.log("Response for deleting a video from Playlist : ",response.data.data);
      // navigate(0) 
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError);
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };
  // loading state till the response from the backend comes
  if (loading) {
    return (
      <div className="min-h-screen w-full px-3 bg-#121212 grid place-items-center">
        <p className="text-3xl text-center text-white">
          <Loader2 className="text-white size-5 text-center animate-spin mt-10" />
        </p>
      </div>
    );
  }

  // error is the API request is resulted error
  if (error) {
    return (
      <div className="min-h-screen w-full px-3 bg-#121212 grid place-items-center">
        <div className="text-white text-3xl flex gap-4">
          <NutOffIcon />
          Error (API)
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-3 bg-#121212 pt-16 relative">
      <div>
        <h1 className="text-center text-white text-2xl font-black">
          Playlist Videos
        </h1>
        <SideMenuBar />
        {apiResponse?.videos?.length > 0 ? (
          <ul className="flex justify-center flex-wrap gap-3 py-5">
            {apiResponse?.videos?.map((video: any) => {
              return (
                <div
                  key={video._id}
                  className="flex-1 min-w-[320px] border-slate-700 p-2 rounded-xl border-[1px] relative"
                >
                  <div className="relative">
                    <video
                      onClick={() => navigate(`/${video?._id}`)}
                      className="w-full object-cover"
                      poster={video?.thumbnail}
                      src={video?.videoFile}
                    />
                    <div className="absolute bg-black bottom-1 px-1 py-[1px] rounded-lg text-center right-1 text-white">
                      {Math.floor(video?.duration)}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-white absolute right-2 bottom-[5%] z-10">
                      <EllipsisVertical className="outline-none" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-white text-[13px] bg-gray-900 bg-opacity-60 p-0 space-y-2 grid border-white rounded-xl text-center w-fit mr-8">
                      <div
                        onClick={() => removeVideoFromPlaylist(video._id,playlistId)}
                        className="px-2 py-1 m-1 rounded-[9px] grid place-items-center cursor-pointer transition-all pb-2 hover:bg-slate-800"
                      >
                        {isloading ? (
                          <Loader2 className="animate-spin " />
                        ) : (
                          "Remove from Watch-Later"
                        )}
                      </div>
                      <a
                        type="download"
                        className="px-2 py-1 m-1 rounded-[9px] transition-all pb-2 hover:bg-slate-800"
                        href={video.videoFile}
                      >
                        download
                      </a>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex items-center gap-1 w-full mt-2 relative">
                    <img
                      onClick={() =>
                        navigate(`/signin/user-profile/${video.owner._id}`)
                      }
                      src={
                        video?.owner?.avatar ??
                        "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                      }
                      className="w-9 h-9 rounded-full border-2 border-white"
                    />
                    <div className="grid gap-1 pl-1">
                      <p className="text-white text-[16px] ml-2 overflow-hidden">
                        {video?.title?.length > 28 ? (
                          <>{video?.title?.slice(0, 25)}. . . . .</>
                        ) : (
                          video?.title
                        )}
                      </p>
                      <div className="flex gap-3 text-[13px]">
                        <p className="text-slate-600 ">
                          {video?.owner?.username}
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
          <div className="text-3xl flex gap-5 min-h-screen w-full justify-center items-center mb-11 text-center text-white my-auto">
            <LucideTrash2 className="text-white size-12 text-center" />
            <p>No videos . . . . .</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistVideos;
