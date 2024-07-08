import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileEdit, Loader2Icon, PenIcon } from "lucide-react";
import axios, { AxiosError } from "axios";
const CustomizeComment = ({ userId, videoId, type, commentId }: any) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [isdeleting, setIsdeleting] = useState(false);

  const handleNewComment = async ({comment,userId}:any) => {
    setError("");
    setIsloading(true);
    try {
      const response = await axios.post(
        `/api/v1/comments/add-comment/${videoId}`,
        {
          comment: comment || `newComment from User`,
          userId: userId,
        }
      );
      console.log("New Comment Response : ", response.data);
      setComment("");
      // navigate(0)
    } catch (error) {
      const axiosError: any = error as AxiosError;
      setError(axiosError);
    } finally {
      setIsloading(false);
    }
  };

  const handleCommentEdit = async (commentId:any) => {
    console.log("commentId : ",commentId);
    
    setError("");
    setIsloading(true);
    try {
      const response = await axios.patch(
        `/api/v1/comments/c/edit-comment/${commentId}`,
        {
          comment: comment || `newComment from User`,
        }
      );
      console.log("New Comment Response : ", response.data);
      setComment("");
      // navigate(0)
    } catch (error) {
      const axiosError: any = error as AxiosError;
      setError(axiosError);
    } finally {
      setIsloading(false);
    }
  };

  const handleDeleteComment = async () => {
    setError("");
    setIsdeleting(true);
    try {
      const response = await axios.delete(
        `/api/v1/comments/c/delete-comment/${commentId}`);
      console.log("New Comment Response : ", response.data);
      setComment("");
      // navigate(0)
    } catch (error) {
      const axiosError: any = error as AxiosError;
      setError(axiosError);
    } finally {
      setIsdeleting(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="gap-1 flex items-center p-1">
          {type == "new" && <PenIcon className="size-5" />}
          <p>
            {type == "new" ? (
              "Comment"
            ) : (
              <FileEdit className="size-3 transition-all" />
            )}
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="text-white rounded-xl bg-opacity-80 border-[2px] bg-slate-900">
        <DialogHeader className="space-y-5">
          <DialogTitle>Customize Comment</DialogTitle>
          <DialogDescription>
            Make changes to your comment here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-1 underline">
            <label htmlFor="title" className="text-[17px]">
              Comment : 
            </label>
            <input
              id="title"
              placeholder="comment . . . . . ."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full min-w-[200px] bg-transparent border-[1px] rounded-xl outline-none p-1 pl-2"
            />
          </div>
        </div>
        <DialogFooter className="flex gap-3 space-y-5">
          {type == "new" ? (
            <div className="flex-1">
              <button
                onClick={() => handleNewComment({comment,userId})}
                className="p-2 w-full my-3 rounded-xl border-[1px] grid place-items-center"
              >
                {isloading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Save Comment"
                )}
              </button>
            </div>
          ) : (
            <div className="flex w-full justify-between gap-10">
              <button
                onClick={() => handleCommentEdit(commentId)}
                className="p-2 w-full my-3 rounded-xl border-[1px] grid place-items-center"
              >
                {isloading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Edit Comment"
                )}
              </button>
              <button
                onClick={() => handleDeleteComment()}
                className="p-2 w-full my-3 rounded-xl border-[1px] grid place-items-center bg-red-700"
              >
                {isdeleting ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Delete Comment"
                )}
              </button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeComment;
