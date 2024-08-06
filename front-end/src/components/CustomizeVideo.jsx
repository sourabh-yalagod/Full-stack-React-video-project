import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import axiosInstance from "@/Redux/api/axiosInstance";
const CustomizeVideo = ({ videoId }) => {
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");
  const { toast } = useToast();
  const time = new Date();
  const queryClient = useQueryClient();
  // const handleVideoUpdate = async (videoId) => {
  //   setIsLoading(true);
  //   try {
  //     const formdata = new FormData();
  //     formdata.append("thumbnail", newThumbnail[0]);
  //     formdata.append("title", newTitle);
  //     formdata.append("description", newDescription);

  //     const res = await axios.patch(
  //       `/api/v1/videos/update-video/${videoId}`,
  //       formdata
  //     );
  //     console.log("Respose for Update Video : ", res.data);
  //     4;
  //     navigate(0);
  //   } catch (error) {
  //     const axiosError = error;
  //     setError(axiosError);
  //     console.log(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleVideoUpdate = async (videoId) => {
    const formdata = new FormData();
    formdata.append("thumbnail", newThumbnail[0]);
    formdata.append("title", newTitle);
    formdata.append("description", newDescription);

    const response = await axiosInstance.patch(
      `/api/v1/videos/update-video/${videoId}`,
      formdata
    );
    return response?.data;
  };
  const handleVideoUpdateMutation = useMutation({
    mutationFn: handleVideoUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playVideo"] });
      toast({
        title:
          "Video Updated Successfully with new Title,Description and Avatar . . . ",
        description: `At : ${time.toLocaleTimeString()}`,
        variant: "default",
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        title: `Video updating process failed due to ${error?.message} . . . `,
        description: `At : ${time.toLocaleTimeString()}`,
        variant: "destructive",
        duration: 2000,
      });
    },
  });
  return (
    <div className="max-h-screen grid place-items-center">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 hover:scale-105 cursor-pointer transition">
            <Edit className="w-5 h-5" />
            Edit
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white w-full dark:bg-black text-black dark:text-white rounded-xl border-gray-300 dark:border-gray-700 transition">
          <DialogHeader>
            <DialogTitle className="text-2xl w-full flex justify-between items-start mt-3 font-semibold mb-2">
              <p>Edit video</p>
              <img
                className="size-9 sm:size-11 rounded-full"
                src={
                  "https://lh3.googleusercontent.com/rormhrw_yZt2v1OKZBaiFCSt8b8QU02kEKiuilfgnpGkOMQd87xm7b7SyIlGoHsL18M"
                }
              />
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 w-full">
            <div>
              <label
                htmlFor="title"
                className="block text-[14px] sm:text-lg font-medium mb-1"
              >
                Title
              </label>
              <input
                id="title"
                value={newTitle}
                placeholder="Title"
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white outline-none focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-[14px] sm:text-lg font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description . . . . . . ."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white outline-none focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-[14px] sm:text-lg font-medium mb-1"
              >
                Thumbnail
              </label>
              <input
                id="thumbnail"
                onChange={(e) => setNewThumbnail(e.target.files)}
                type="file"
                className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:rounded-xl file:bg-blue-50 dark:file:bg-gray-700 file:text-blue-700 dark:file:text-gray-300 hover:file:bg-blue-100 dark:hover:file:bg-gray-600 transition"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <button
              onClick={() => handleVideoUpdateMutation.mutate(videoId)}
              className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
            >
              {handleVideoUpdateMutation.isPending ? (
                <Loader2Icon className="animate-spin w-5 h-5" />
              ) : (
                "Save Changes"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomizeVideo;
