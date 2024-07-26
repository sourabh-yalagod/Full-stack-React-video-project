import { BookmarkXIcon } from "lucide-react";

const VideoNotFound = ({ children }) => {
  return (
    <div className="absolute grid place-items-center w-full px-3 dark:bg-black pt-10 dark:text-white text-slate-800 max-h-screen">
      <div className="text-xl gap-3 sm:text-2xl md:text-3xl grid w-full place-content-center animate-pulse">
        <div className="flex gap-4">
          <BookmarkXIcon className="text-slate-700 size-12 animate-bounce" />
          <p>Videos not Found . . . !</p>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default VideoNotFound;
