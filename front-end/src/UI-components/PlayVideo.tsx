import axios, { AxiosError } from "axios";
import {
  Bell,
  Edit2,
  EditIcon,
  Eye,
  Loader2Icon,
  LoaderCircle,
  LucideGhost,
  MessageCircleHeartIcon,
  MessageCirclePlus,
  Pause,
  Play,
  ThumbsUp,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { calclulateVideoTime } from "./CalculateTime";

const PlayVideo = () => {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [commentInput, setCommentInput] = useState(false);
  const [newComment, setNewComment]: any = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeResponse, setLikeResponse] = useState<any>({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [seeMoreComment, setSeeMoreComment] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newThumbnail, setNewThumbnail]: any = useState("");
  const [apiResponse, setApiResponse]: any = useState({});
  const [isloading, setIsLoading] = useState(false);

  // Video playing functions
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
  // API handling functions
  const handleNewComment = useCallback(async () => {
    console.log("New Comment : ", newComment);
    setError(null);
    try {
      const response = await axios.post(
        `/api/v1/comments/add-comment/${videoId}`,
        {
          content: newComment || `newComment from User`,
          userId: apiResponse.Uploader._id,
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

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/api/v1/videos/get-video/${videoId}`,
          { signal }
        );
        setApiResponse(response.data.data);
        console.log("ApiResponse : ", apiResponse);
        setLoading(false);
      } catch (error) {
        const axiosError = error as AxiosError;
        setError(axiosError);
        setLoading(false);
      }
    })();
  }, [videoId]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <LoaderCircle className="animate-spin size-20 text-white" />
      </div>
    );
  }

  if (error) {
    console.log(error);

    return (
      <div className="min-h-sreen grid place-items-center">
        <div className="text-white text-xl text-center flex gap-3">
          <LucideGhost />
          <p>Error loading data: {error.message}</p>
        </div>
      </div>
    );
  }

  const handleLikes = async () => {
    setLikeStatus(!likeStatus);
    try {
      const response = await axios.post(
        `/api/v1/likes/toggle-like-status/${videoId}`,
        {
          userId: apiResponse.Uploader._id,
        }
      );
      setLikeResponse(response.data.data);
      console.log("likeResponse : ", likeResponse);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError);
    }
  };

  const handleSubscription = async () => {
    setIsSubscribed(!isSubscribed);
    try {
      const response = await axios.post(`/api/v1/users/handle-subscribers`, {
        ChannelId: apiResponse?.owner,
      });
      console.log("Handle Subscription Response :", response.data);
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
    }
  };

  const handleVideoUpdate = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("thumbnail", newThumbnail[0]);
      formdata.append("title", newTitle);
      formdata.append("description", newDescription);

      const res = await axios.patch(
        `/api/v1/videos/update-video/${videoId}`,
        formdata
      );
      console.log("Respose for Update Video : ", res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError);
    } finally {
      setLoading(false);
    }
  };

  const changeComment = async (commentId: any) => {
    // setLoading(true);
    setError("");
    try {
      const response = await axios.patch(`/api/v1/comments/c/${commentId}`);
      console.log("Resposen for Editing the comment : ", response.data);
    } catch (error: any) {
      const axiosError = error as AxiosError;
      setError(axiosError);
      alert(error.message);
    } finally {
      // setLoading(false)
    }
  };

  if (!apiResponse) {
    return (
      <div className="min-h-scree w-full grid place-items-center">
        <h1 className="flex gap-2">
          Not Found <Loader2Icon className="text-2xl text-white animate-spin" />
        </h1>
      </div>
    );
  }

  const addToWatchLater = async (videoId: any) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(`/api/v1/users/watch-later`, {
        videoId,
      });
      console.log("Response from add to watch later : ", response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full grid p-1">
      {/* this is the video and controllers Div */}
      <div className="w-full max-w-4xl md:mt-14 mx-auto bg-black group relative">
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-white absolute z-0 right-1 p-2 hover:scale-95 transition-all opacity-85 hover:opacity-100 bg-slate-700 rounded-full">
              <Edit2 />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] text-white rounded-xl bg-opacity-50 bg-slate-900">
            <DialogHeader>
              <DialogTitle>Edit video</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-1 underline">
                <label htmlFor="title" className="text-[17px]">
                  Title
                </label>
                <input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full min-w-[200px] bg-transparent border-[1px] rounded-xl outline-none p-1 pl-2"
                />
              </div>
              <div className="grid gap-1 underline">
                <label htmlFor="description" className="text-[17px]">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full min-w-[200px] bg-transparent border-[1px] rounded-xl outline-none p-1 pl-2"
                />
              </div>
              <div className="grid gap-1 underline">
                <label htmlFor="thumbnail" className="text-[17px]">
                  Thumbnail
                </label>
                <input
                  id="thumbnail"
                  onChange={(e) => setNewThumbnail(e.target.files)}
                  type="file"
                  className="w-auto bg-transparent border-[1px] rounded-xl outline-none p-1 pl-2"
                />
              </div>
            </div>
            <DialogFooter>
              <button
                onClick={() => handleVideoUpdate()}
                className="w-full p-2 rounded-xl border-[1px]"
              >
                Save Changs
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
      <div className="relative my-2 px-3 w-full rounded-xl bg-#121212 border-[1px] border-slate-800 text-slate-300 text-[15px] sm:text-xl">
        <p className="absolute top-0 left-3 text-slate-600 min-h-2 text-[13px] pb-4">
          Title
        </p>
        <div className="flex pt-5 pb-2">
          {apiResponse?.title.substring(0, 50)}
          <p>{apiResponse?.title.length > 50 ? ". . . . . ." : "."}</p>
        </div>
      </div>
      {/* this is the subscription display Div */}
      <div className="flex w-full bg-slate-800 my-1 rounded-xl p-1 gap-3 text-white items-center justify-center">
        <div className="flex w-full items-center justify-around gap-10">
          <div className="flex items-center gap-2 justify-between relative">
            <img
              onClick={() =>
                navigate(`/signin/user-profile/${apiResponse?.Uploader._id}`)
              }
              className="rounded-full w-10 h-10 sm:h-12 sm:w-12"
              src={apiResponse?.Uploader.avatar}
              alt="https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
            />
            <div className="flex items-center gap-4 justify-center">
              <p className="flex">{apiResponse?.Uploader.username}</p>
              <p className="flex text-[13px] text-slate-500 sm:text-[18px]">
                Subscribers : {apiResponse?.Uploader?.subscriberCount ?? " 0"}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => handleSubscription()}
              className={`${
                apiResponse?.Uploader?.isSubscribed
                  ? "bg-gray-700"
                  : "bg-red-600 "
              }
             text-white py-1 px-3 rounded-xl sm:text-xl md:text-2xl`}
            >
              <p className="flex gap-2 items-center">
                Subscribe
                {apiResponse?.Uploader?.isSubscribed ? (
                  <Bell className="size-4 sm:size-6 md:size-8" />
                ) : (
                  ""
                )}
              </p>
            </button>
          </div>
        </div>
      </div>
      {/* video figures */}
      <div className="w-full px-3 py-1 my-1 flex items-center justify-around border-[1px] border-slate-700 rounded-xl">
        <div className="flex gap-4 text-white">
          <p onClick={() => handleLikes()} className="flex gap-1">
            <ThumbsUp className="" />
            {apiResponse?.totalLikes[0]?.likes || "0"}
          </p>
        </div>
        <div
          onClick={() => addToWatchLater(videoId)}
          className="flex gap-1 border-[1px] p-1 sm:text-[15px] sm:py-3 sm:px-1 text-[11px] border-slate-700 rounded-xl items-center text-white hover:scale-95 transition-all cursor-pointer"
        >
          <Eye />
          <p>
            {isloading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "add to watch later"
            )}
          </p>
        </div>
        <p className="text-[13px] text-slate-400">
          Views - {apiResponse?.views}
        </p>
      </div>
      {/* title and description of refrerenced video */}
      <ScrollArea className="relative p-4 h-full my-1 max-h-[300px] w-full border-[1px] border-slate-800 rounded-xl">
        <p className="absolute top-0 left-3 text-slate-600 text-[13px] pb-4">
          Description
        </p>
        <button
          className=" absolute bottom-0 right-3 text-[12px] text-slate-600"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          Show {showFullDescription ? "less......" : "more......"}
        </button>
        <p className="pt-5 pb-2 text-slate-500">
          {showFullDescription
            ? `${apiResponse?.description}`
            : `${apiResponse?.description.substring(0, 150)}......`}
        </p>
      </ScrollArea>
      {/* Comments displayed using map method */}
      <ScrollArea className="w-full text-white mt-4 flex items-center py- h-full max-h-[250px] border-[1px] border-slate-800 rounded-xl p-1">
        <div className="text-white text-[20px] py-4 flex w-full justify-around items-center max-w-md md:justify-start gap-5 md:ml-5">
          <h1>Comments : {apiResponse?.allComments.length || "0"}</h1>
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
                className="w-full pl-3 max-w-md bg-transparent border-[1px] rounded-xl px-1 outline-none text-white text-sm"
                type="text"
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
                placeholder="new Comment......."
              />
              <button
                onClick={() => handleNewComment()}
                className="text-white p-2 bg-#121212 bg-blue-600 rounded-xl active:bg-blue-800"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        {!(apiResponse?.allComments.length > 0) ? (
          <div className="flex w-full justify-center gap-2 text-slate-500">
            No Comments......
            <MessageCircleHeartIcon />
          </div>
        ) : (
          apiResponse?.allComments.map((e: any) => (
            <div
              key={e._id}
              className="flex border-[1px] space-y-2 md:justify-around gap-3 rounded-xl px-2 pt-6 pb-3 my-2 border-slate-700 relative"
            >
              <div className="min-h-2 text-gray-500 underline w-full justify-between px-3 absolute top-0 text-[12px] flex gap-3">
                <p className="absolute right-[3%]">
                  {calclulateVideoTime(e.createdAt)}
                </p>
              </div>
              <div className="flex items-end gap-2 sm:items-center">
                <img
                  className="rounded-full w-10 h-10"
                  src={
                    e.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
                  }
                  alt="https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
                />
                <p className="text-[11px]">{e.username}</p>
              </div>
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
                <p
                  onClick={() => changeComment(e._id)}
                  className="absolute right-[5%] p-1 rounded-full bg-slate-600 hover:scale-110 top-[25%]"
                >
                  <EditIcon className="size-4" />
                </p>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
};
{
  /* <ThumbsUpIcon onClick={() => handleLikes()} />
        <p>{0}</p> */
}

export default PlayVideo;
