import { Trash } from "lucide-react";

const VideoNotFound = () => {
  return (
    <div className="absolute inset-0 grid place-items-center w-full px-3 dark:bg-slate-900 dark:text-white text-slate-800 min-h-screen -z-20">
      <div className="text-3xl flex justify-center gap-8 text-center">
        <Trash className="text-slate-700 size-12 text-center animate-pulse mb-40" />
        <p>Video not Found . . . !</p>
      </div>
    </div>
  );
};

export default VideoNotFound;
