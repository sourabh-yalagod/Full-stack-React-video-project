import { calclulateVideoTime } from "@/UI-components/CalculateTime";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios, { AxiosError } from "axios";
import {
  EditIcon,
  MessageCircleHeartIcon,
  MessageCirclePlus,
} from "lucide-react";
import { useCallback, useState } from "react";
import CustomizeComment from "./CustomizeComment";

const Comments = ({ apiResponse, videoId }: any) => {
  const [commentInput, setCommentInput] = useState(false);
  const [seeMoreComment, SetSeeMoreComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const userId = apiResponse?.Uploader?._id ?? localStorage.getItem("userId");
  const handleNewComment = useCallback(async () => {
    setError("");
    try {
      const response = await axios.post(
        `/api/v1/comments/add-comment/${videoId}`,
        {
          content: newComment || `newComment from User`,
          userId: userId,
        }
      );

      console.log("New Comment Response : ", response.data);
      setCommentInput(false);
      setNewComment("");
      // navigate(0)
    } catch (error) {
      const axiosError: any = error as AxiosError;
      setError(axiosError);
    }
  }, [newComment]);
  return (
    <ScrollArea className="w-full text-white overflow-scroll mt-4 grid place-items-center max-h-72 rounded-xl p-1 border-slate-500 border-[1px]">
      <div className="text-slate-700 dark:text-white text-[20px] py-4 flex w-full justify-around items-center gap-5 md:ml-5 space-y-2">
        <h1>Comments : {apiResponse?.allComments?.length || "0"}</h1>
        <h1
          onClick={() => setCommentInput(true)}
          className="text-gray-400 dark:text-slate-400 text-sm bg-gray-200 dark:bg-gray-800 p-1 rounded-xl flex gap-1 cursor-default"
        >
          <CustomizeComment videoId={videoId} userId={userId} type="new" />
        </h1>
      </div>
      {commentInput ? (
        <div>
          <div className="flex gap-1">
            <input
              className="w-full pl-3 max-w-md bg-transparent border-[1px] rounded-xl px-1 outline-none text-slate-700 dark:text-white text-sm"
              type="text"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              placeholder="new Comment......."
            />
            <button
              onClick={() => handleNewComment()}
              className="text-white p-2 bg-blue-600 rounded-xl active:bg-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {!(apiResponse.allComments?.length > 0) ? (
        <div className="flex w-full justify-center gap-2 text-slate-500 dark:text-slate-400 items-center">
          No Comments......
          <MessageCircleHeartIcon />
        </div>
      ) : (
        apiResponse?.allComments.map((e: any) => (
          <div
            key={e?._id ?? Math.random()}
            className="flex relative w-full text-slate-700 dark:text-slate-300 min-w-[360px] justify-between p-2 border-[1px] border-slate-300 dark:border-slate-700 rounded-xl space-y-4 my-1"
          >
            <div className="min-h-2 underline w-full justify-between px-3 absolute top-0 text-[12px] flex gap-3">
              <p className="absolute right-[3%]">
                {calclulateVideoTime(e?.createdAt)}
              </p>
            </div>
            <div className="">
              <img
                className="rounded-full w-10 h-10"
                src={
                  e.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
                }
                alt="https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
              />
              <p className="text-[11px]">{e?.username}</p>
            </div>
            <div className="text-slate-500 dark:text-slate-300 ml-4 flex-1 w-full">
              <p>
                {seeMoreComment
                  ? `${e?.content?.substring(0, 30)}`
                  : `${e?.content}`}
                {e?.content?.length > 30 ? "......." : "."}
              </p>
              <p
                className="text-slate-600 dark:text-slate-400 text-xs cursor-pointer absolute bottom-2 right-2"
                onClick={() => SetSeeMoreComment(!seeMoreComment)}
              >
                {seeMoreComment ? "See less . . . . ." : "See more....."}
              </p>
              <p className="absolute right-[5%] p-1 rounded-full bg-slate-600 hover:scale-110 top-[25%]">
                {userId == e?.userId && <CustomizeComment />}
              </p>
            </div>
          </div>
        ))
      )}
    </ScrollArea>
  );
};

export default Comments;
