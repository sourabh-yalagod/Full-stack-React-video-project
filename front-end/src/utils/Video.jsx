import { formatVideoDuration } from "@/Services/FormateVideoDuration";
import { TitleFormatar } from "@/Services/TitleFormater";
import { calclulateVideoTime } from "@/Services/CalculateTime";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Loader2 } from "lucide-react";
import { useAddToPlayList } from "@/hooks/AddToPlayList";
import { useCallback, useEffect } from "react";
import userAuth from "@/Services/Auth";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const Video = ({
  video = {},
  userId = "" || video.owner,
  avatar = "",
  username = "",
  dropMenuBar = [],
  playlist = [],
  titleSize = "14px",
  fontSize = "12px",
}) => {
  const { toast } = useToast();
  const { addToPlayList, addToPlaylistLoading } = useAddToPlayList();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleClick = useCallback(() => {
    const userId = userAuth().userId;
    if (!userId) {
      toast({
        title: "Please signin to watchvideos",
        description:
          "if you signin then you will be authenticated to all the pages and Routes so Please sign-in and Enjoy . . . . !",
        duration: 4000,
      });
      navigate("/signin");
    } else {
      navigate(`/signin/play-video/${video?._id}`);
      queryClient.invalidateQueries({ queryKey: ["watchHistoryVideos"] });
    }
  }, []);

  return (
    <div className="">
      {/* video projection */}
      <div className="relative">
        <video
          // ref={refe}
          onClick={() => handleClick()}
          className="w-full object-cover rounded-xl z-20 scroll-none overflow-hidden"
          poster={video?.thumbnail}
          src={video?.videoFile}
        />

        <div className="absolute bg-black bottom-0 rounded-[6px] text-[12px] p-1 right-0 text-white">
          {formatVideoDuration(video?.duration)}
        </div>
      </div>

      {/* three dot menu for some operations(add to watch later, download video) */}
      <DropdownMenu>
        <DropdownMenuTrigger className="text-gray-900 dark:text-white absolute right-2 bottom-[5%] z-10">
          <EllipsisVertical className="outline-none" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-gray-900 dark:text-white text-[13px] grid space-y-1 border-gray-500 dark:border-slate-600 bg-opacity-50 cursor-pointer rounded-[7px] bg-gray-100 dark:bg-black text-center w-fit mr-8 px-0 py-1">
          {dropMenuBar?.map((field, index) => (
            <div
              key={index}
              className="px-2 py-1 m-1 grid place-items-center rounded-[9px] transition-all pb-2 hover:bg-gray-500 dark:hover:bg-slate-800 dark:text-slate-400"
              onClick={field?.operation}
            >
              {field?.name !== "Add-video To playlist" ? (
                field?.name
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger className=" text-slate-800 dark:text-slate-200">
                    Add-video To playlist
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="text-gray-900 dark:text-white text-[13px] grid space-y-1 border-gray-500 dark:border-slate-600 bg-opacity-50 cursor-pointer place-content-center rounded-[7px] bg-gray-100 dark:bg-black text-center w-fit px-0 py-1 mr-44">
                    {playlist?.map((playlist) => {
                      return (
                        <div
                          key={playlist._id}
                          onClick={() =>
                            addToPlayList({
                              videoId: video?._id,
                              playlistId: playlist._id,
                            })
                          }
                        >
                          {addToPlaylistLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            playlist?.title
                          )}
                        </div>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
          <a
            href={video?.videoFile}
            className="px-2 py-1 m-1 grid place-items-center rounded-[9px] transition-all pb-2 hover:bg-gray-500 dark:hover:bg-slate-800 dark:text-slate-400"
            target="_blank"
            rel="noopener noreferrer"
            type="download"
          >
            Download
          </a>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Content displayed just below the video */}
      <div className="flex items-center gap-1 w-full overflow-none mt-2 relative">
        <img
          onClick={() =>
            navigate(`/signin/user-profile/${userId || video?.owner?._id}`)
          }
          src={
            avatar ??
            video?.owner?.avatar ??
            "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
          }
          className={`size-8 rounded-full border-2 border-white`}
        />
        <div className="grid gap-1">
          <p
            className={`text-gray-700 dark:text-white ml-2 overflow-hidden text-[${titleSize}]`}
          >
            {video?.title ? TitleFormatar(video?.title) : ""}
          </p>
          <div className={`flex gap-3 ml-2 text-[${fontSize}]`}>
            <p className="text-gray-500 dark:text-slate-600 ">{username}</p>
            <p className="text-gray-500 dark:text-slate-600 ">
              views {video?.views}
            </p>
            <p className="text-gray-500 dark:text-slate-600 ">
              {calclulateVideoTime(video?.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
