import axios from "axios";
import { Loader2 } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import BottomNavBar from "../components/BottomNavBar.tsx";
import { SkeletonCard } from "@/utils/Skeleton.tsx";
import Video from "@/utils/Video.tsx";
import VideoNotFound from "@/utils/VideoNotFound.tsx";
import APIError from "@/utils/APIError.tsx";
import { sortArray } from "@/Services/sortArray.ts";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useAddToWatchLater } from "@/hooks/AddToWatchLater.ts";
import data from "../utils/Sections.json";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResults, setSearchQueryResults]: any = useState([]);
  const [error, setError]: any = useState("");
  const [sort, setSort] = useState("");
  const [result, setResult]: any = useState([]);
  const [option, setOption] = useState("");
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloadVideos, setIsLoadVideos] = useState(true);
  const { addToWatchLater, watchLaterLoading } = useAddToWatchLater();
  const debounced = useDebounceCallback(setSearchQuery, 600);
  const { toast } = useToast();

  window.addEventListener("scroll", () => {
    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 200 &&
      !(searchQuery || option)
    ) {
      setTimeout(() => {
        setIsLoadVideos(true);
      }, 1500);
    }
  });

  // API call to display all the video on dashboard
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      {
        !result.length && setLoading(true);
      }
      try {
        const response = await axios.get(
          `/api/v1/home?limit=${limit}&pages=${pages}`,
          {
            signal: signal,
          }
        );
        setLimit(2);
        if (isloadVideos && response.data.length) {
          setPages((pages) => pages + 1);
          setResult((prev: any) => [...prev, ...response.data]);
          setIsLoadVideos(false);
        }
        setError("");
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data);
          alert(error);
        } else if (error.request) {
          setError("No response received from server.");
        } else {
          setError("Error: " + error.message);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [isloadVideos]);

  const searchQueryResult = useCallback(
    (option: any) => {
      (async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `/api/v1/home/search-video?search=${searchQuery || option}`
          );
          setError("");
          setSearchQueryResults(response?.data?.data);
          toast({
            title: `Found related Videos . . . .!`,
            duration: 1000,
          });
        } catch (error: any) {
          (() => {
            toast({
              title: "Error while search......!",
              description: error?.message,
              variant: "destructive",
              duration: 1200,
            });
          })();
          // navigate(0);
        } finally {
          setIsLoading(false);
          setSearchQuery("");
        }
      })();
    },
    [searchQuery, option]
  );

  if (loading) {
    return <SkeletonCard />;
  }

  if (error) {
    setTimeout(() => {
      return <APIError />;
    }, 1500);
  }
  return (
    <div className="min-h-screen transition-all w-full flex relative place-items-center py-3 dark:bg-gray-900 bg-white">
      <BottomNavBar />
      <div className="min-h-screen w-full p-2 grid place-items-center transition-all">
        <div className="w-full grid place-items-center gap-3 md:grid-cols-2">
          <div className="w-full relative max-w-[450px]">
            <input
              type="text"
              onChange={(e) => debounced(e.target.value)}
              defaultValue={searchQuery}
              placeholder="Search Here....."
              className="bg-transparent pl-4 py-2 text-gray-700 dark:text-slate-400 grid place-items-center text-[18px] w-full border-gray-700 dark:border-slate-400 outline-none border-[1px] rounded-xl"
            />
            <button
              onClick={() => searchQueryResult(searchQuery)}
              className="absolute right-0 inset-y-0 cursor-pointer bg-blue-600 text-white px-3 rounded-l-3xl rounded-xl"
              disabled={searchQuery.length ? false : true}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Search"}
            </button>
          </div>
          <div className="flex w-auto p-1 gap-2 rounded-xl items-center justify-start">
            {data.Niches.map((niche) => {
              <p className="bg-slate-100 p-1 rounded-lg text-sm sm:text-[16px] cursor-pointer hover:scale-105 transition-all">
                Niches :{" "}
              </p>;
              return (
                <p
                  key={niche.id}
                  className="bg-slate-100 p-2 rounded-xl text-sm sm:text-[16px] cursor-pointer hover:scale-105 transition-all"
                  onClick={() => {
                    setOption(niche?.value);
                    searchQueryResult(option);
                  }}
                >
                  {niche.niche}
                </p>
              );
            })}
          </div>
        </div>
        <div className="w-full min-h-screen py-5">
          {result.length > 0 ? (
            <ul className="flex flex-wrap items-center w-full gap-2 justify-center">
              {(searchQueryResults.length > 0
                ? searchQueryResults
                : result
              ).map((video: any) => {
                return (
                  <div
                    key={video._id + Math.random()}
                    className="flex-1 min-w-[320px] max-w-[350px] border-slate-700 border p-2 rounded-xl relative"
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
              {isloadVideos ? (
                !(searchQueryResults || option) && <SkeletonCard />
              ) : (
                <p className="absolute my-2 animate-pulse bottom-0 text-xl dark:text-white text-slate-800 w-full text-center">
                  No more videos to load . . . . !
                </p>
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

export default memo(Dashboard);
