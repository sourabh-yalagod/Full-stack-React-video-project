import axios, { AxiosError } from "axios";
import {
  EllipsisVertical,
  Loader2,
  LucideTrash2,
  NutOffIcon,
  PlusCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const VideoPlaylist = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [apiResponse, setApiResponse]: any = useState("");
  const [loading, setLoading]: any = useState(false);
  const [isloading, setIsLoading]: any = useState(false);
  const [error, setError]: any = useState("");
  const [done, setDone] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newThumbnail, setNewThumbnail]: any = useState("");
  console.log(userId);

  // Api request for watch-later videos
  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("Fetching profile for UserId:", userId);
      try {
        setError("");
        const response = await axios.get(
          `/api/v1/video-play-list/all-play-lists/${userId}`
        );
        setDone(false);
        setApiResponse(response?.data?.data);
        console.log("API Response for playlist:", apiResponse);
      } catch (error) {
        const err = error as AxiosError;
        setError(err.message ?? "Error while API call");
        setDone(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, done]);

  const handleCreatePlaylist = async () => {
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("thumbnail", newThumbnail[0]);
      formdata.append("title", newTitle);
      formdata.append("description", newDescription);

      const res = await axios.post(
        `/api/v1/video-play-list/create-playlist`,
        formdata
      );
      console.log("Respose from playlist creation : ", res.data.data);
      navigate(0);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaylistModification = async (platlistId: any) => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("thumbnail", newThumbnail[0]);
    formdata.append("title", newTitle);
    formdata.append("description", newDescription);
    try {
      setError("");
      const response = await axios.put(
        `/api/v1/video-play-list/modify-playlist/${platlistId}`,
        formdata
      );
      console.log("Response for Delete playlist : ", response);
      navigate(0);
    } catch (error) {
      const err = error as AxiosError;
      setError(err);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // function used to delete playlist
  const deletePlaylist = async (playlistId: any) => {
    console.log("Playlist ID : ", playlistId);

    setIsLoading(true);
    try {
      setError("");
      const response = await axios.delete(
        `/api/v1/video-play-list/delete-playlist/${playlistId}`
      );
      console.log("Response for Delete playlist : ", response);
    } catch (error) {
      const err = error as AxiosError;
      setError(err);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // loading state till the response from the backend comes
  if (loading) {
    return (
      <div className="min-h-screen w-full px-3 bg-#121212 grid place-items-center">
        <p className="text-3xl text-center text-white">
          <Loader2 className="text-white size-5 text-center animate-spin mt-10" />
        </p>
      </div>
    );
  }
  
  // error is the API request is resulted error
  if (error) {
    return (
      <div className="min-h-screen w-full px-3 bg-#121212 grid place-items-center">
        <div className="text-white text-3xl flex gap-4">
          <NutOffIcon />
          Error (API)
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full px-3 dark:bg-gray-900 pt-7 relative">
      <h1 className="text-center text-gray-900 dark:text-white text-2xl font-black">
        All Play lists
      </h1>
      <div className="flex justify-center text-gray-900 dark:text-slate-400 flex-wrap gap-3 py-5">
        {apiResponse ? (
          apiResponse.map((playlist:any) => (
            <div
              key={playlist._id}
              className="flex-1 min-w-[250px] max-w-[350px] p-1 border-gray-900 dark:border-slate-700 rounded-xl border-[1px] relative"
            >
              <img
                onClick={() => navigate(`/signin/playlist-videos/${playlist._id}`)}
                src={playlist.thumbnail ?? "https://cdn-icons-png.freepik.com/512/4475/4475979.png"}
                className="w-full rounded-xl object-cover"
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 dark:text-white absolute right-2 bottom-1 z-10">
                  <EllipsisVertical className="outline-none" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="text-gray-900 dark:text-white text-[13px] grid space-y-1 border-gray-900 dark:border-slate-600 bg-opacity-50 cursor-pointer rounded-[7px] bg-gray-200 dark:bg-black text-center w-fit mr-8 p-0">
                  <div
                    onClick={() => deletePlaylist(playlist._id)}
                    className="px-2 py-1 border-gray-900 dark:border-slate-700 rounded-lg grid place-items-center hover:bg-gray-300 dark:hover:bg-gray-900 transition-all"
                  >
                    {isloading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="px-2 py-1 border-gray-900 dark:border-slate-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-900 transition-all">
                        Edit Playlist
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] text-gray-900 dark:text-slate-200 rounded-xl bg-opacity-50 bg-gray-100 dark:bg-slate-900">
                      <DialogHeader>
                        <DialogTitle className="text-xl">Edit Playlist</DialogTitle>
                        <DialogDescription className="font-semibold tracking-wider">
                          Edit the playlist <br /> as you want
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
                          onClick={() => handlePlaylistModification(playlist?._id)}
                          className="w-full p-2 rounded-xl border-[1px] grid place-items-center"
                        >
                          {isloading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Edit and save"
                          )}
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-center">{playlist.title}</p>
            </div>
          ))
        ) : (
          <div className="text-3xl flex gap-5 min-h-screen w-full justify-center items-center mb-11 text-center text-gray-900 dark:text-white my-auto">
            <LucideTrash2 className="text-gray-900 dark:text-white size-12 text-center" />
            <p>No Playlists were found . . . . .</p>
          </div>
        )}
      </div>
      <div className="w-full grid place-items-center text-gray-900 dark:text-white">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex gap-3 p-3 border-[1px] rounded-xl border-gray-500 dark:border-slate-500">
              <PlusCircle />
              Create New Playlist
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] text-gray-900 dark:text-slate-200 rounded-xl bg-opacity-50 bg-gray-100 dark:bg-slate-900">
            <DialogHeader>
              <DialogTitle className="text-xl">Create New Playlist</DialogTitle>
              <DialogDescription className="font-semibold tracking-wider">
                Create a play-list and group <br /> the similar videos together . . . . !
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
                onClick={handleCreatePlaylist}
                className="w-full p-2 rounded-xl border-[1px] grid place-items-center"
              >
                {isloading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Create play-list"
                )}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default VideoPlaylist;
