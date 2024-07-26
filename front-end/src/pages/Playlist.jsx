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
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const VideoPlaylist = () => {
  const time = new Date();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");
  const queryClient = useQueryClient();

  const fetchAllPlaylist = async () => {
    const response = await axios.get(
      `/api/v1/video-play-list/all-play-lists/${userId}`
    );
    return response?.data;
  };

  const {
    data: playlists,
    isPending: playlistsLoading,
    isError,
    error: playlistsError,
  } = useQuery({
    queryKey: ["fetchPlaylists"],
    queryFn: fetchAllPlaylist,
    staleTime: 60 * 10 * 1000,
  });

  const handleCreatePlaylist = async () => {
    const formdata = new FormData();
    formdata.append("thumbnail", newThumbnail[0]);
    formdata.append("title", newTitle);
    formdata.append("description", newDescription);

    const response = await axios.post(
      `/api/v1/video-play-list/create-playlist`,
      formdata
    );
    return response?.data;
  };

  const createPlayListMutation = useMutation({
    mutationFn: handleCreatePlaylist,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fetchPlaylists"] });
      toast({
        title: "Playlist created Successfully",
        description: `At ${time.toLocaleTimeString()}`,
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        title: "Playlist creation failed . . . . !",
        description: error?.message,
        variant: "destructive",
        duration: 2000,
      });
    },
  });

  const handlePlaylistModification = async (playlistId) => {
    const formdata = new FormData();
    formdata.append("thumbnail", newThumbnail[0]);
    formdata.append("title", newTitle);
    formdata.append("description", newDescription);
    const response = await axios.put(
      `/api/v1/video-play-list/modify-playlist/${playlistId}`,
      formdata
    );
    return response?.data;
  };

  const PlayListModificationMutation = useMutation({
    mutationFn: handlePlaylistModification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchPlaylists"] });
      toast({
        title: "Playlist Modified Successfully",
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        title: "Playlist Modification failed . . . . !",
        description: error?.message,
        variant: "destructive",
        duration: 2000,
      });
    },
  });
  const handlePlaylistDeletion = async (playlistId) => {
    const response = await axios.delete(
      `/api/v1/video-play-list/delete-playlist/${playlistId}`
    );
    return response?.data;
  };

  const PlayListDeletionMutation = useMutation({
    mutationFn: handlePlaylistDeletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchPlaylists"] });
      toast({
        title: "Playlist Deleted Successfully",
        description: `At ${time.toLocaleTimeString()}`,
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        title: "Playlist Modification failed . . . . !",
        description: error?.message,
        variant: "destructive",
        duration: 2000,
      });
    },
  });

  if (playlistsLoading) {
    return <APIloading />;
  }

  if (isError) {
    return <APIError />;
  }
  return (
    <div className="min-h-screen w-full px-3 dark:bg-black pt-7 relative">
      <h1 className="text-center text-gray-900 dark:text-white text-2xl font-black">
        All Play lists
      </h1>
      <div className="flex justify-center text-gray-900 dark:text-slate-400 flex-wrap gap-3 py-5">
        {playlists?.data ? (
          playlists?.data?.map((playlist) => (
            <div
              key={playlist?._id}
              className="flex-1 min-w-[250px] max-w-[350px] p-1 border-gray-900 dark:border-slate-700 rounded-xl border-[1px] relative"
            >
              <img
                onClick={() =>
                  navigate(`/signin/playlist-videos/${playlist?._id}`)
                }
                src={
                  playlist?.thumbnail ??
                  "https://cdn-icons-png.freepik.com/512/4475/4475979.png"
                }
                className="w-full rounded-xl object-cover"
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 dark:text-white absolute right-2 bottom-1 z-10">
                  <EllipsisVertical className="outline-none" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="text-gray-900 dark:text-white text-[13px] grid space-y-1 border-gray-900 dark:border-slate-600 bg-opacity-50 cursor-pointer rounded-[7px] bg-gray-200 dark:bg-black text-center w-fit mr-8 p-0">
                  <div
                    onClick={() =>
                      PlayListDeletionMutation.mutate(playlist._id)
                    }
                    className="px-2 py-1 border-gray-900 dark:border-slate-700 rounded-lg grid place-items-center hover:bg-gray-300 dark:hover:bg-gray-800 transition-all"
                  >
                    {PlayListDeletionMutation.isPending ? (
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
                    <DialogContent className="sm:max-w-[425px] text-gray-900 dark:text-slate-200 rounded-xl bg-opacity-50 bg-gray-100 dark:bg-black">
                      <DialogHeader>
                        <DialogTitle className="text-xl">
                          Edit Playlist
                        </DialogTitle>
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
                          onClick={() =>
                            PlayListModificationMutation.mutate(playlist?._id)
                          }
                          className="w-full p-2 rounded-xl border-[1px] grid place-items-center"
                        >
                          {PlayListModificationMutation.isPending ? (
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
              <p className="text-center">{playlist?.title}</p>
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
          <DialogContent className="sm:max-w-[425px] text-gray-900 dark:text-slate-200 rounded-xl bg-opacity-50 bg-gray-100 dark:bg-black">
            <DialogHeader>
              <DialogTitle className="text-xl">Create New Playlist</DialogTitle>
              <DialogDescription className="font-semibold tracking-wider">
                Create a play-list and group <br /> the similar videos together
                . . . . !
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
                onClick={() => createPlayListMutation.mutate()}
                className="w-full p-2 rounded-xl border-[1px] grid place-items-center"
              >
                {createPlayListMutation?.isPending ? (
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
