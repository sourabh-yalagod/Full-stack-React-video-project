import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios, { AxiosError } from "axios";
import { Edit, Loader2Icon } from "lucide-react";
import { useState } from "react";
const CustomizeVideo = ({ videoId }: any) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newThumbnail, setNewThumbnail]: any = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [err, setError] = useState("");

  const handleVideoUpdate = async (videoId: any) => {
    setIsLoading(true);
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
      const axiosError: any = error as AxiosError;
      setError(axiosError);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="gap-1">
          <Edit className="size-5" />
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="text-white rounded-xl bg-opacity-80 border-[2px] bg-slate-900">
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
            onClick={() => handleVideoUpdate(videoId)}
            className="w-full p-2 rounded-xl border-[1px] grid place-items-center"
          >
            {isloading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeVideo;
