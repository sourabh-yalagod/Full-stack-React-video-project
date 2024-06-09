import axios, { AxiosError } from "axios";
import {
  Bell,
  Loader2,
  LoaderCircle,
  MessageCircleHeartIcon,
  MessageCirclePlus,
  Pause,
  Play,
  Sliders,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const PlayVideo = () => {
  const { videoId } = useParams();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [commentInput, setCommentInput] = useState(false);
  const [newComment, setNewComment]: any = useState("");
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeResponse, setLikeResponse] = useState<any>({});
  const [Subscribe, setSubscribe] = useState(false);

  const [seeMoreComment, setSeeMoreComment] = useState(false);
  // Video playing functions
  const togglePlayPause = () => {
    if (playing) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setPlaying(!playing);
  };
  console.log(newComment);
  
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

  // API handling functions
  const handleNewComment = useCallback(async () => {
    console.log("New Comment : ", newComment);
    setError(null);
    try {
      const response = await axios.post(
        `/api/v1/comments/add-comment/${videoId}`,
        {
          content: newComment || `newComment from User`,
        }
      );

      console.log("New Comment Response : ", response.data);
      setCommentInput(false);
      setNewComment("");
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError);
    }
  }, [newComment]);

  const fetchVideoData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/v1/videos/get-video/${videoId}`);
      setResources(response.data.data);

      setLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError);
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    fetchVideoData();
    console.log(resources);
  }, [fetchVideoData]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <LoaderCircle className="animate-spin size-20 text-white" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  const handleLikes = async () => {
    setLikeStatus(!likeStatus);
    try {
      const response = await axios.post(
        `/api/v1/likes/toggle-like-status/${videoId}`
      );
      setLikeResponse(response.data.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
    }
  };

  const handleSubscription = async () => {
    setSubscribe(!Subscribe);
    try {
      const response = await axios.post(`/api/v1/users/handle-subscribers`, {
        subscriptionStatus: Subscribe,
        ChannelId: resources.video.Uploader._id,
      });
      console.log("Handle Subscription Response :", response.data.data);
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
    }
  };

  return (
    <div className="w-full grid p-1">
      {/* this is the video and controllers DIv */}
      <div className="w-full max-w-4xl md:mt-14 mx-auto bg-black group relative">
        <video
          ref={videoRef}
          src={resources?.video?.videoFile}
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
      {/* this is the subscription display Div */}
      <div className="flex w-full bg-slate-800 mt-2 rounded-xl p-1 gap-3 text-white items-center justify-center">
        <div className="flex w-full items-center justify-around gap-10">
          <div className="flex items-center gap-2 justify-between">
            <img
              className="rounded-full w-12 h-12"
              src={resources.subscription.avatar}
              alt="https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
            />
            <div className="grid gap-1">
              <p className="flex">{resources.video.Uploader.username}</p>
              <p className="flex text-gray-300">
                Subscribers :{" "}
                {resources?.subscription?.subscriberCount || (
                  <Loader2 className="animate-spin" />
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handleSubscription()}
              className={`${
                resources.subscription.isSubscribed
                  ? "bg-gray-700"
                  : "bg-red-600 "
              }
             text-white py-1 px-3 rounded-xl sm:text-xl md:text-2xl`}
            >
              <p className="flex gap-2 items-center">
                Subscribe
                {resources.subscription.isSubscribed ? (
                  <Bell className="size-4 sm:size-6 md:size-8" />
                ) : (
                  ""
                )}
              </p>
            </button>
          </div>
        </div>
      </div>
      {/* title and description of refrerenced video */}
      <div>
        <div className="relative my-2 px-3 flex rounded-xl bg-#121212 border-[1px] border-slate-800 text-slate-300 text-[15px] sm:text-xl">
          <p className="absolute top-0 left-3 text-slate-600 min-h-2 text-[13px] pb-4">
            Title
          </p>
          <div className="flex pt-5 pb-2">
            {resources.video.title.substring(0, 50)}
            <p>{resources.video.title.length > 50 ? ". . . . . ." : "."}</p>
          </div>
        </div>
        <div>
          <ScrollArea className="relative p-4 h-full max-h-[250px] my- mt-2 border-[1px] border-slate-800 rounded-xl">
            <p className="absolute top-0 left-3 text-slate-600 text-[13px] pb-4">
              Description
            </p>
            <p className="pt-5 text-slate-500">{resources.video.description}</p>
          </ScrollArea>
        </div>
      </div>
      {/* Comments displayed using map method */}
      <ul className="w-full text-white">
        <ScrollArea className="flex items-center py- h-full max-h-[250px] my- mt-2 border-[1px] border-slate-800 rounded-xl p-1">
          <div className="text-white text-[20px] flex w-full justify-around items-center">
            <h1>Comments : </h1>
            <h1
              onClick={() => setCommentInput(!commentInput)}
              className="text-gray-400 text-sm bg-gray-800 p-1 rounded-xl flex gap-1 cursor-default"
            >
              <MessageCirclePlus />
              Add Comment....
            </h1>
          </div>
          {commentInput ? (
            <>
              <div className="flex gap-1">
                <input
                  className="w-full pl-3 max-md bg-transparent border-[1px] rounded-xl px-1 outline-none text-white text-sm"
                  type="text"
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                  placeholder="new Comment......."
                />
                <button
                  onClick={() => handleNewComment()}
                  className="text-white p-2 bg-#121212"
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            ""
          )}
          {!(resources.comments.length > 0) ? (
            <div className="flex w-full justify-center gap-2 text-slate-500">
              No Comments......
              <MessageCircleHeartIcon />
            </div>
          ) : (
            resources.comments.map((e: any) => (
              <div
                key={e._id}
                className="flex border-[1px] gap-3 rounded-xl px-2 pt-6 pb-3 my-2 border-slate-700 relative"
              >
                <div className="min-h-2 text-gray-500 underline w-full justify-between px-3 absolute top-0 text-[12px] flex gap-3">
                  <p className="">{e.commentOwner.username}</p>
                  <p className="">{e.commentOwner.createdAt}</p>
                </div>
                <img
                  className="rounded-full w-10 h-10"
                  src={
                    e.commentOwner.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
                  }
                  alt="https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
                />
                <div className={`text-slate-50`}>
                  <p>
                    {seeMoreComment
                      ? `${e.content.substring(0, 30)}`
                      : `${e.content}`}
                    {e.content.length > 30 ? "......." : "."}
                  </p>
                  <p
                    className="text-slate-600 text-xs cursor-pointer absolute bottom-2 right-2"
                    onClick={() => setSeeMoreComment(!seeMoreComment)}
                  >
                    See more.....
                  </p>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </ul>
    </div>
  );
};
{
  /* <ThumbsUpIcon onClick={() => handleLikes()} />
        <p>{0}</p> */
}

export default PlayVideo;
