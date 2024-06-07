import { Pause, Play, Sliders } from "lucide-react";
import { useRef, useState } from "react";

const PlayVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);

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
    <div className="w-full grid">
      <div className="w-full max-w-4xl mx-auto bg-black group relative">
        <video
          ref={videoRef}
          src="http://res.cloudinary.com/daaqothd4/video/upload/v1717252355/idnlwyrmfs3g9h8anerf.mp4"
          onTimeUpdate={handleTimeUpdate}
          className="w-full cursor-pointer"
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
          <Sliders className="mx-2 text-white size-9" />
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
    </div>
  );
};

export default PlayVideo;
