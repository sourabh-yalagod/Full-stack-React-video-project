import { useState } from "react";
import axios from "axios";
import { Loader, Video } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import userAuth from "@/Services/Auth";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/Redux/api/axiosInstance";

const UploadVideo = () => {
  const navigate = useNavigate();
  const { userId } = userAuth();
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      thumbnail: null,
      videoFile: null,
    },
  });

  const uploadVideoMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post(
        "/api/v1/videos/upload-video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast({
        title: "Video uploaded successfully",
        description: data?.message,
        duration: 1500,
        variant: "default",
      });
      navigate(`/signin/user-profile/${userId}`);
    },
    onError: (error) => {
      toast({
        title: "Video uploaing failed . . . . !",
        description: error?.message,
        duration: 1500,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);
    uploadVideoMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 dark:bg-black px-5">
      <div className="text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 min-w-[350px] w-full max-w-[450px] sm:min-w-sm rounded-xl py-7 grid place-items-center bg-white dark:bg-black text-sm space-y-7 px-3">
        <div className="flex w-full justify-between p-4">
          <div className="flex gap-2 items-center cursor-pointer">
            <img
              className="size-6 sm:size-9 rounded-full"
              src="https://lh3.googleusercontent.com/rormhrw_yZt2v1OKZBaiFCSt8b8QU02kEKiuilfgnpGkOMQd87xm7b7SyIlGoHsL18M"
              alt="Logo"
            />
            <p className="text-slate-800 text-lg sm:text-xl font-semibold dark:text-white">
              Video-Tube
            </p>
          </div>
          <h1 className="text-xl flex gap-3 items-center font-semibold cursor-pointer animate-pulse">
            <Video />
            Upload Video
          </h1>
        </div>
        <form
          className="space-y-7 w-full grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between relative">
            <label htmlFor="title" className="text-[14px] sm:text-[16px]">
              Title:
            </label>
            <input
              type="text"
              placeholder="Title"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="bg-transparent border-b-2 outline-none border-gray-700 dark:border-gray-500 ml-3 w-full"
            />
            {errors.title && (
              <span className="text-red-500 absolute -bottom-5 text-[11px]">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="grid justify-between relative">
            <label htmlFor="description" className="text-[14px] sm:text-[16px]">
              Description:
            </label>
            <textarea
              id="description"
              placeholder="Description..."
              {...register("description", {
                required: "Description is required",
              })}
              className="bg-transparent border-b-2 outline-none w-full min-w-[300px] text-[15px] border-gray-700 dark:border-gray-500 rounded-sm"
            />
            {errors.description && (
              <span className="text-red-500 absolute -bottom-5 text-[11px] z-20">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex justify-between relative">
            <label htmlFor="thumbnail" className="text-[14px] sm:text-[16px]">
              Thumbnail:
            </label>
            <input
              type="file"
              id="thumbnail"
              {...register("thumbnail", { required: "Thumbnail is required" })}
              className="bg-transparent outline-none border-gray-700 dark:border-gray-500 ml-3"
            />
            {errors.thumbnail && (
              <span className="text-red-500 absolute -bottom-5 text-[11px]">
                {errors.thumbnail.message}
              </span>
            )}
          </div>

          <div className="flex justify-between relative">
            <label htmlFor="videoFile" className="text-[14px] sm:text-[16px]">
              Video File:
            </label>
            <input
              type="file"
              id="videoFile"
              {...register("videoFile", { required: "Video file is required" })}
              className="bg-transparent outline-none border-gray-700 dark:border-gray-500 ml-3"
            />
            {errors.videoFile && (
              <span className="text-red-500 absolute -bottom-5 text-[11px]">
                {errors.videoFile.message}
              </span>
            )}
          </div>

          <div className="flex w-full justify-around items-center">
            <NavLink
              className="bg-red-500 text-center hover:bg-red-700 outline-none border-gray-700 dark:border-gray-500 font-bold py-2 px-4"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="bg-green-500 text-center hover:bg-green-700 outline-none border-gray-700 dark:border-gray-500 font-bold py-2 px-4 rounded"
              to={`/signin/user-profile/${userId}`}
            >
              Profile
            </NavLink>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 outline-none border-gray-700 dark:border-gray-500 font-bold py-2 px-4 rounded"
            >
              {uploadVideoMutation.isPending ? (
                <div className="flex gap-2 items-center">
                  <Loader className="animate-spin" />
                  Uploading...
                </div>
              ) : (
                "Upload Video"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
