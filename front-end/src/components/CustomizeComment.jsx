import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileEdit, Loader, Loader2Icon, PenIcon } from "lucide-react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import axiosInstance from "@/Redux/api/axiosInstance";
const CustomizeComment = ({ userId, videoId, type, commentId }) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const time = new Date();

  const handleNewComment = async ({ comment, userId }) => {
    const response = await axiosInstance.post(
      `/api/v1/comments/add-comment/${videoId}`,
      {
        comment: comment || `newComment from User`,
        userId: userId,
      }
    );
    return response?.data;
  };

  const newCommentMutatation = useMutation({
    mutationFn: handleNewComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playVideo"] });
      toast({
        title: "Comment Succesfull",
        description: "At " + time.toLocaleTimeString(),
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: error?.message || "failed please try again . . . . . !",
        description: "At " + time.toLocaleTimeString(),
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const handleEditComment = async ({ commentId, comment }) => {
    const response = await axiosInstance.patch(
      `/api/v1/comments/c/edit-comment/${commentId}`,
      {
        comment: comment || `newComment from User`,
      }
    );
  };
  const commnetEditMutation = useMutation({
    mutationFn: handleEditComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playVideo"] });
      toast({
        title: "Comment Edited Successfully . . . .!",
        description: "At " + time.toLocaleTimeString(),
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: error?.message || "failed please try again . . . . . !",
        description: "At " + time.toLocaleTimeString(),
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const handleDeleteComment = async (commentId) => {
    const response = await axiosInstance.delete(
      `/api/v1/comments/c/delete-comment/${commentId}`
    );
    return response?.data;
  };

  const commentDeleteMutation = useMutation({
    mutationFn: handleDeleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playVideo"] });
      toast({
        title: "Comment Deleted Successfully . . . .!",
        description: "At " + time.toLocaleTimeString(),
        duration: 3000,
      });
      setComment("");
    },
    onError: (error) => {
      toast({
        title: error?.message || "failed please try again . . . . . !",
        description: "At " + time.toLocaleTimeString(),
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="gap-1 flex items-center p-1 text-slate-700 dark:text-slate-100">
          {type == "new" && <PenIcon className="size-5" />}
          <p>
            {type == "new" ? (
              "Comment"
            ) : (
              <FileEdit className="size-3 transition-all text-slate-300 dark:text-slate-100" />
            )}
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-xl bg-opacity-80 border-[1px] border-gray-500 dark:bg-black dark:text-white text-slate-950">
        <DialogHeader className="space-y-5">
          <DialogTitle>Customize Comment</DialogTitle>
          <DialogDescription>
            Make changes to your comment here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 ">
          <div className="grid gap-1 underline">
            <label htmlFor="title" className="text-[17px]">
              Comment :
            </label>
            <input
              id="title"
              autoFocus
              placeholder="comment . . . . . ."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full min-w-[200px] border-gray-500 bg-transparent rounded-xl outline-none p-1 pl-2"
            />
          </div>
        </div>
        <DialogFooter className="flex gap-3 space-y-5">
          {type == "new" ? (
            <div className="flex-1">
              <button
                onClick={() => newCommentMutatation.mutate({ comment, userId })}
                className="rounded-xl p-2  border-gray-500 border-[1px] grid place-items-center"
              >
                {newCommentMutatation?.isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Save Comment"
                )}
              </button>
            </div>
          ) : (
            <div className="flex w-full justify-between gap-14">
              <button
                onClick={() =>
                  commnetEditMutation.mutate({ commentId, comment })
                }
                className="w-full my-3 rounded-xl border-[1px] border-slate-500 grid place-items-center"
              >
                {commnetEditMutation?.isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Edit Comment"
                )}
              </button>
              <button
                onClick={() => commentDeleteMutation?.mutate(commentId)}
                className="p-2 w-full my-3 rounded-xl border-[1px] text-white grid place-items-center bg-red-700"
              >
                {commentDeleteMutation?.isPending ? (
                  <Loader className="animate-spin" />
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
