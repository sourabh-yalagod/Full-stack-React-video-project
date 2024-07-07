import { Clipboard, Eye, Loader2Icon, ThumbsUp } from "lucide-react";
import CustomizeVideo from "./CustomizeVideo";
import { useHandleLikes } from "@/hooks/HandleLikes";
import { useAddToWatchLater } from "@/hooks/AddToWatchLater";

const VideoFigures = ({ apiResponse, videoId }: any) => {
  const { handleLikes } = useHandleLikes();
  const { watchLaterLoading, addToWatchLater } = useAddToWatchLater();

  return (
    <div className="w-full flex gap-2 p-1 items-center justify-around text-[11px] text-slate-600 dark:text-slate-400 rounded-xl border-slate-500 border-[1px]">
      <div className="">
        <p
          onClick={() =>
            handleLikes({ userId: apiResponse?.Uploader?._id, videoId })
          }
          className="flex gap-1 dark:text-white text-slate-700"
        >
          <ThumbsUp className="size-5" />
          {apiResponse?.totalLikes[0]?.likes ?? "0"}
        </p>
      </div>
      <div
        onClick={() =>
          navigator.clipboard
            .writeText(apiResponse?.videoFile)
            .then(() => console.log("Copied"))
        }
        className="grid place-items-center hover:scale-105 transition-all cursor-pointer"
      >
        <Clipboard className="size-5" />
        <p>( Video URL )</p>
      </div>
      <div
        onClick={() => addToWatchLater(videoId)}
        className="grid gap-1 place-items-center border-[1px] p-2 sm:py-3 sm:px-1 border-slate-300 dark:border-slate-700 rounded-xl items-center hover:scale-95 transition-all cursor-pointer"
      >
        <p>
          {watchLaterLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            `add to watch later`
          )}
        </p>
      </div>
      {apiResponse?.owner == localStorage.getItem("userId") ? (
        <div className="grid place-content-center">
          <CustomizeVideo videoId={videoId} />
        </div>
      ) : (
        ""
      )}
      <p className="grid place-items-center">
        <Eye className="size-5" />
        Views - {apiResponse?.views}
      </p>
    </div>
  );
};

export default VideoFigures;
