import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const videoUploadSchema = z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.any(),
    videoFile: z.any(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(videoUploadSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      videoFile: "",
    },
  });
  const formdata = new FormData();

  const onSubmit = async (data: z.infer<typeof videoUploadSchema>) => {
    setIsUploading(true);
    try {
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("videoFile", data.videoFile[0]);
      formdata.append("thumbnail", data.thumbnail[0]);

      const response = await axios.post(
        "/api/v1/videos/upload-video",
        formdata
      );
      console.log(response);
      const id = response.data.data.owner;
      localStorage.setItem("user", response.data.data.owner);
      navigate(`/signin/user-profile/${id}`);
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage =
        err.message ||
        "User account creation failed due to some reasons. Please check again.";
      console.log("ERROR :", errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 dark:bg-gray-900 uploadVideo">
      <div className="text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 min-w-[350px] w-full max-w-[450px] sm:min-w-sm rounded-xl py-7 grid place-items-center bg-white dark:bg-gray-800 text-sm space-y-7 px-3">
        <h1 className="text-center text-5xl underline py-5">
          Upload Video
        </h1>
        <form
          className="space-y-7 w-full grid justify-around"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <div className="flex justify-between">
            <label htmlFor="title" className="text-[18px]">
              Title:
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className="bg-transparent border-b-2 outline-none border-gray-700 dark:border-gray-500 ml-3 w-full overflow-scroll"
            />
          </div>
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}

          <div className="grid justify-between w-full">
            <label htmlFor="description" className="text-[18px]">
              Description:
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="bg-transparent border-b-2 w-full outline-none min-w-[350px] text-[15px] border-gray-700 dark:border-gray-500 border-[1px] rounded-sm"
            />
          </div>
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}

          <div className="flex gap-4 justify-between">
            <label htmlFor="thumbnail" className="text-[18px]">
              Thumbnail :
            </label>
            <input
              type="file"
              id="thumbnail"
              {...register("thumbnail")}
              className="bg-transparent outline-none border-gray-700 dark:border-gray-500 ml-3"
            />
          </div>
          {errors.thumbnail && (
            <span className="text-red-500">{errors.thumbnail.message}</span>
          )}

          <div className="flex gap-4 justify-between">
            <label htmlFor="videoFile" className="text-[18px]">
              Video File :
            </label>
            <input
              type="file"
              id="videoFile"
              {...register("videoFile")}
              className="bg-transparent outline-none border-gray-700 dark:border-gray-500 ml-3"
            />
          </div>
          {errors.videoFile && (
            <span className="text-red-500">{errors.videoFile.message}</span>
          )}
          <div className="flex w-full justify-around items-center">
            <NavLink
              className="bg-red-500 text-center hover:bg-red-700 outline-none border-gray-700 dark:border-gray-500 font-bold py-2 px-4 "
              to="/"
            >
              Back
            </NavLink>
            <NavLink
              className="bg-green-500 text-center hover:bg-green-700 outline-none border-gray-700 dark:border-gray-500 font-bold py-2 px-4 rounded "
              to={`/signin/user-profile/${localStorage.getItem("userId")}`}
            >
              Profile
            </NavLink>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 outline-none border-gray-700 dark:border-gray-500 font-bold py-2 px-4 rounded "
            >
              {isUploading ? (
                <Loader2 className="animate-spin" />
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
