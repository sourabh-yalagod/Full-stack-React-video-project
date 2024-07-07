import { BookmarkXIcon } from "lucide-react";

const VideoNotFound = () => {
  return (
    <div className="absolute inset-0 grid place-items-center w-full px-3 dark:bg-slate-900 dark:text-white text-slate-800 min-h-screen">
      <div className="text-3xl flex mt-10 w-full items-center animate-pulse justify-center gap-5 mb-24">
        <BookmarkXIcon className="text-slate-700 size-12 animate-bounce" />
        <p>Videos not Found . . . !</p>
      </div>
    </div>
  );
};

export default VideoNotFound;
