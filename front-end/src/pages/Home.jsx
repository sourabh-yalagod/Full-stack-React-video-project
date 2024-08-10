import axios from "axios";
import { Loader2 } from "lucide-react";
import { memo, useEffect, useState } from "react";
import BottomNavBar from "../components/BottomNavBar.jsx";
import { SkeletonCard } from "@/utils/Skeleton.jsx";
import Video from "@/utils/Video.jsx";
import VideoNotFound from "@/utils/VideoNotFound.jsx";
import APIError from "@/utils/APIError.jsx";
import { useToast } from "@/components/ui/use-toast";
import { useAddToWatchLater } from "@/hooks/AddToWatchLater.js";
import data from "../utils/Sections.json";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/Redux/api/axiosInstance.js";

const limit = 5;

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResults, setSearchQueryResults] = useState([]);
  const [option, setOption] = useState("");
  const { addToWatchLater, watchLaterLoading } = useAddToWatchLater();
  const { toast } = useToast();
  const { inView, ref } = useInView();

  const homePageVideos = async ({ pageParam = 1 }) => {
    const response = await axiosInstance.get(
      `/api/v1/home?limit=${limit}&page=${pageParam}`
    );
    return response?.data;
  };

  const {
    data: videos,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error: queryError,
  } = useInfiniteQuery({
    queryKey: ["homePageVideos"],
    queryFn: homePageVideos,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length + 1 : undefined;
    },
    staleTime: 60 * 30 * 1000,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const result = videos?.pages.flatMap((page) => page) || [];

  const searchVideos = async (searchQuery, option) => {
    const response = await axiosInstance.get(
      `/api/v1/home/search-video?search=${searchQuery || option}`
    );

    return response?.data;
  };
  const searchMutation = useMutation({
    mutationFn: searchVideos,
    onSuccess: (data) => {
      setSearchQueryResults(data?.data);
    },
    onError: (error) => {
      toast({
        title: "Error while searching...",
        description: error?.message,
        variant: "destructive",
        duration: 1200,
      });
    },
  });
  if (isLoading) {
    return <SkeletonCard cards={10} />;
  }

  if (queryError) {
    return <APIError />;
  }

  return (
    <div className="min-h-screen transition-all w-full flex relative place-items-center py-3 dark:bg-black bg-white">
      <BottomNavBar />
      <div className="min-h-screen w-full p-2 grid place-items-center transition-all">
        <div className="w-full grid place-items-center gap-2 md:grid-cols-2">
          <div className="flex w-full max-w-sm overflow-scroll p-1 gap-1 justify-around rounded-xl items-center">
            {data?.Niches?.map((niche) => (
              <p
                key={niche.id}
                className="bg-white dark:text-white text-black p-2 rounded-xl text-sm sm:text-[16px] cursor-pointer hover:scale-105 transition-all dark:bg-slate-950 hover:dark:bg-slate-800 hover:bg-blue-500 hover:text-white"
                onClick={() => {
                  const choice = niche?.value;
                  setOption(choice);
                  searchMutation.mutate(choice);
                }}
              >
                {niche.niche}
              </p>
            ))}
          </div>
          <div className="w-full relative max-w-[400px]">
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search Here....."
              className="bg-transparent pl-4 py-2 text-gray-700 dark:text-slate-400 grid place-items-center text-[18px] w-full border-gray-700 dark:border-slate-400 outline-none border-[1px] rounded-xl"
            />
            <button
              onClick={() => searchMutation.mutate(searchQuery)}
              className="absolute right-0 inset-y-0 cursor-pointer bg-blue-600 text-white px-3 rounded-l-3xl rounded-xl"
              disabled={searchMutation?.isPending}
            >
              {searchMutation?.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
        <div className="w-full min-h-screen py-5">
          {result.length > 0 ? (
            // className="flex-1 min-w-[320px] max-w-[350px] border-slate-700 border p-2 rounded-xl relative"
            // <ul className="grid w-full gap-2 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ul className="grid w-full gap-2 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(searchQueryResults.length > 0
                ? searchQueryResults
                : result
              ).map((video, index) => {
                const lastItem = result.length === index + 1;
                return (
                  <div
                    ref={lastItem ? ref : null}
                    key={video._id + index}
                    className="border-slate-700 w-full border p-2 rounded-xl relative max-w-[450px]"
                  >
                    <Video
                      video={video}
                      userId={video?.owner?._id}
                      username={video?.owner?.username}
                      avatar={video?.owner?.avatar}
                      dropMenuBar={[
                        {
                          name: watchLaterLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Add to watch Later"
                          ),
                          operation: () => addToWatchLater(video?._id),
                        },
                      ]}
                    />
                  </div>
                );
              })}
              {!(searchQuery || option) && hasNextPage && <SkeletonCard />}
              {isFetchingNextPage && (
                <Loader2 className="animate-spin mx-auto" />
              )}
            </ul>
          ) : (
            <VideoNotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
