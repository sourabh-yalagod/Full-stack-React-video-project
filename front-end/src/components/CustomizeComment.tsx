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
const CustomizeComment = ({ userId, videoId, type }: any) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);

  const handleNewComment = async () => {
    setError("");
    setIsloading(true);
    try {
      const response = await axios.post(
        `/api/v1/comments/add-comment/${videoId}`,
        {
          content: comment || `newComment from User`,
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
  
  const handleCommentEdit = async () => {
    setError("");
    setIsloading(true);
    try {
      const response = await axios.post(
        `/api/v1/comments/add-comment/${videoId}`,
        {
          content: comment || `newComment from User`,
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="gap-1 flex items-center p-1">
          {type == "new" && <PenIcon className="size-5" />}
          <p>{type == "new" ? "Comment" : <FileEdit className="size-3 transition-all"/>}</p>
        </button>
      </DialogTrigger>
      <DialogContent className="text-white rounded-xl bg-opacity-80 border-[2px] bg-slate-900">
        <DialogHeader>
          <DialogTitle>Edit video</DialogTitle>
          <DialogDescription>
            Make changes to your comment here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-1 underline">
            <label htmlFor="title" className="text-[17px]">
              Comment
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
        <DialogFooter>
          <button
            onClick={() => handleNewComment()}
            className="w-full p-2 rounded-xl border-[1px] grid place-items-center"
          >
            {isloading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
          {!(type == "new") && (
            <button
              onClick={() => handleCommentEdit()}
              className="w-full p-2 rounded-xl border-[1px] grid place-items-center bg-red-800"
            >
              {isloading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Delete Comment"
              )}
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeComment;
