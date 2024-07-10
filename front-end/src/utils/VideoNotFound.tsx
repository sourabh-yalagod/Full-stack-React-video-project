import { BookmarkXIcon } from "lucide-react";

const VideoNotFound = () => {
  return (
    <div className="absolute inset-0 grid place-items-center w-full px-3 dark:bg-slate-900 dark:text-white text-slate-800 max-h-screen">
      <div className="text-2xl sm:text-3xl md:text-4xl flex mt-10 w-full items-center animate-pulse justify-center gap-5">
        <BookmarkXIcon className="text-slate-700 size-12 animate-bounce" />
        <p>Videos not Found . . . !</p>
      </div>
    </div>
  );
};

export default VideoNotFound;
