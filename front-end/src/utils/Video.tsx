import { formatVideoDuration } from "@/Services/FormateVideoDuration";
import { TitleFormatar } from "@/Services/TitleFormater";
import { calclulateVideoTime } from "@/UI-components/CalculateTime";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// const [isloading, setIsLoading] = useState(false);
import { EllipsisVertical } from "lucide-react";

const Video = ({
  video = {},
  userId = "" || video.owner,
  avatar = "",
  username = "",
  dropMenuBar = [],
}: //

any) => {
  const navigate = useNavigate();
  return (
    <div
      key={Math.random()}
      className="flex-1 min-w-[320px] max-w-[500px] border-gray-700 dark:border-slate-700 p-2 rounded-xl border-[1px] relative"
    >
      {/* video projection */}
      <div className="relative">
        <video
          onClick={() => navigate(`/${video?._id}`)}
          className="w-full object-cover"
          poster={video?.thumbnail}
          src={video?.videoFile}
        />

        <div className="absolute bg-black bottom-0 rounded-[6px] text-[12px] p-1 right-0 text-white">
          {formatVideoDuration(video?.duration)}
        </div>
      </div>

      {/* three dot menu for some operations(add to watch later, download video) */}
      <DropdownMenu>
        <DropdownMenuTrigger className="text-gray-700 dark:text-white absolute right-2 bottom-[5%] z-10">
          <EllipsisVertical className="outline-none" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-gray-700 dark:text-white text-[13px] grid space-y-1 border-gray-700 dark:border-slate-600 bg-opacity-50 cursor-pointer rounded-[7px] bg-gray-100 dark:bg-slate-900 text-center w-fit mr-8 p-0">
          {dropMenuBar.map((field: any) => (
            <div
              key={field}
              className="px-2 py-1 m-1 grid place-items-center rounded-[9px] transition-all pb-2 hover:bg-gray-200 dark:hover:bg-slate-800"
              onClick={field.operation}
            >
              {field.name}
            </div>
          ))}
          <a
            href={video.videoFile}
            className="px-2 py-1 m-1 grid place-items-center rounded-[9px] transition-all pb-2 hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-700 dark:text-white"
            target="_blank" // Open in a new tab
            rel="noopener noreferrer"
            type="download"
          >Download</a>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Content displayed just below the video */}
      <div className="flex items-center gap-1 w-full overflow-scroll mt-2 relative">
        <img
          onClick={() =>
            navigate(`/signin/user-profile/${userId || video?.owner?._id}`)
          }
          src={
            avatar ??
            video?.owner?.avatar ??
            "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
          }
          className="w-9 h-9 rounded-full border-2 border-white"
        />
        <div className="grid gap-1 pl-1">
          <p className="text-gray-700 dark:text-white text-[16px] ml-2 overflow-hidden">
            {TitleFormatar(video?.title) || ""}
          </p>
          <div className="flex gap-3 text-[13px]">
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
