import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
// import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate()
  const [isUploading, setIsUploading] = useState(false);

  const videoUploadSchema = z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.any(),
    videoFile: z.any(),
  });

  const { register , handleSubmit , formState: { errors } } = useForm({
    resolver: zodResolver(videoUploadSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      videoFile: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof videoUploadSchema>) => {
    setIsUploading(true);
    try {
      const formdata = new FormData();
    
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("videoFile", data.videoFile[0]);
      formdata.append("thumbnail", data.thumbnail[0]);

      const response = await axios.post("/api/v1/videos/upload-video", formdata);
      console.log(response);
      
      const id = response.data.data.owner
      
      localStorage.setItem('user',(response.data.data.owner))
      
      navigate(`/signin/user-profile/${id}`)
    } 
    catch (error) {
      const err = error as AxiosError;
      
      const errorMessage =
        err.message ||
        "User account creation failed due to some reasons. Please check again.";
      console.log("ERROR :",errorMessage);

    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center uploadVideo">
      <div className="text-white border-2 min-w-[350px] w-full max-w-[450px] sm:min-w-sm rounded-lg p-6">
        <h1 className="text-center text-5xl underline py-5 mb-3">
          Upload Video
        </h1>
        <form
          className="space-y-8 w-full grid place-content-between"
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
              className="bg-transparent border-b-2 outline-none border-slate-700 ml-3 w-full overflow-scroll"
            />
          </div>
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}

          <div className="grid justify-between">
            <label htmlFor="description" className="text-[18px]">
              Description:
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="bg-transparent border-b-2 outline-none min-w-[350px] w-full text-[15px] border-slate-700 border-[1px] rounded-sm"
            />
          </div>
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}

          <div className="flex justify-between">
            <label htmlFor="thumbnail" className="text-[18px]">
              Thumbnail :
            </label>
            <input
              type="file"
              id="thumbnail"
              {...register("thumbnail")}
              className="bg-transparent outline-none border-slate-700 ml-3"
            />
          </div>
          {errors.thumbnail && (
            <span className="text-red-500">{errors.thumbnail.message}</span>
          )}

          <div className="flex justify-between">
            <label htmlFor="videoFile" className="text-[18px]">
              Video :
            </label>
            <input
              type="file"
              id="videoFile"
              {...register("videoFile")}
              className="bg-transparent outline-none border-slate-700 ml-3"
            />
          </div>
          {errors.videoFile && (
            <span className="text-red-500">{errors.videoFile.message}</span>
          )}
          <div className="flex w-full justify-around">
            <NavLink
              className="bg-red-500 text-center hover:bg-blue-700 outline-none border-slate-700 ml-3 font-bold py-2 px-4 mt-4"
              to="/"
            >
              Back
            </NavLink>
            <NavLink
              className="bg-green-500  text-center hover:bg-blue-700 outline-none border-slate-700 ml-3 font-bold py-2 px-4 rounded mt-4"
              to={`/signin/user-profile/${localStorage.getItem('userId')}`}
            >
              Profile
            </NavLink>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 outline-none border-slate-700 ml-3 font-bold py-2 px-4 rounded mt-4"
            >
              {isUploading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Upload /> && "Upload Video"
              )}
            </button>
          </div>
        </form>
        <div className="w-full flex justify-center pt-4 gap-4"></div>
      </div>
    </div>
  );
};

export default SignUp;