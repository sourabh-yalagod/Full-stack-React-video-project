import { Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";

const VideoController = ({apiResponse}:any) => {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (playing) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
    setVolume(volume);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const progress = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime =
        (videoRef.current.duration * progress) / 100;
    }
    setProgress(progress);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };
  return (
    <div>
      <div className="w-full max-w-4xl md:mt-14 mx-auto bg-black group relative">
        <video
          ref={videoRef}
          src={apiResponse?.videoFile}
          onTimeUpdate={handleTimeUpdate}
          className="w-full"
          onClick={togglePlayPause}
        />
        <div
          id="controller"
          className="flex gap-2 z-10 px-2 justify-around absolute bottom-0 w-full bg-black bg-opacity-70 items-center p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button
            onClick={togglePlayPause}
            className="text-white text-xl animate-pulse"
          >
            {playing ? <Pause /> : <Play />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full animate-out"
          />
          <div className="grid place-items-center">
            <p className="text-white text-sm items-center">Volume</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20"
            />
          </div>
        </div>
      </div>
      <div className="relative my-2 px-3 w-full rounded-xl bg-white dark:bg-slate-700 bg-opacity-60 border-[1px] border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[15px] sm:text-xl">
        <p className="absolute top-0 left-3 text-slate-600 dark:text-slate-400 min-h-2 text-[13px] pb-4">
          Title
        </p>
        <div className="flex pt-5 pb-2">
          {apiResponse?.title?.substring(0, 50)}
          <p>{apiResponse?.title?.length > 50 ? ". . . . . ." : "."}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoController;
