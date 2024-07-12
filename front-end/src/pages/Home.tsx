import axios from "axios";
import { Loader2 } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar.tsx";
import { SkeletonCard } from "@/utils/Skeleton.tsx";
import Video from "@/utils/Video.tsx";
import VideoNotFound from "@/utils/VideoNotFound.tsx";
import APIloading from "@/utils/APIloading.tsx";
import APIError from "@/utils/APIError.tsx";
import { sortArray } from "@/Services/sortArray.ts";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useAddToWatchLater } from "@/hooks/AddToWatchLater.ts";
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
      document.documentElement.scrollHeight - 200
      && !(searchQuery||option)
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
        setLimit(5);
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

  const searchQueryResult = useCallback((option:any) => {
    console.log(option);
    
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/home/search-video?search=${searchQuery||option}`
        );
        setError("");
        setSearchQueryResults(response?.data?.data);
        console.log(searchQueryResults);
      } catch (error: any) {
        (() => {
          toast({
            title: "Error while search......!",
            description: error?.message,
            variant: "destructive",
            duration:1200
          });
        })();
        // navigate(0);
      } finally {
        setIsLoading(false);
        setSearchQuery("");
      }
    })();
  }, [searchQuery,option]);

  useEffect(() => {
    let sortedArray = sortArray(result, sort);
    setResult(sortedArray);
  }, [sort]);

  if (loading) {
    return <APIloading />;
  }

  if (error) {
    return <APIError />;
  }

  return (
    <div className="min-h-screen transition-all w-full flex relative place-items-center py-3 dark:bg-gray-900 bg-white">
      {/* only display for mobile screen */}
      <BottomNavBar />

      <div className="min-h-screen w-full p-2 grid place-items-center transition-all">
        <div className="flex w-full gap-3 sm:justify-between justify-center items-center">
          <div className="w-full relative mx-5">
            <input
              type="text"
              onChange={(e) => debounced(e.target.value)}
              defaultValue={searchQuery}
              placeholder="Search Here....."
              className="bg-transparent pl-4 text-gray-700 dark:text-slate-400 grid place-items-center text-[18px] w-full border-gray-700 dark:border-slate-400 outline-none border-[1px] rounded-xl"
            />
            <button
              onClick={() => searchQueryResult(searchQuery)}
              className="absolute right-0 inset-y-0 bg-blue-600 text-white px-3 rounded-l-3xl rounded-xl"
              disabled={searchQuery.length ? false : true}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Search"}
            </button>
          </div>
          <select
          name="select"
            className="border p-1 px-2 rounded-xl dark:text-white text-slate-800"
            onChange={(e) => {
              let value = e.target.value
              setOption(value);
              searchQueryResult(value)
              console.log(value);
              
            }}
            value={option}
          >
            <option value={"sourabh"}>sourabh</option>
            <option value={"oct"}>octopus</option>
            <option value={"news"}>News</option>
            <option value={"finance"}>Finance</option>
            <option value={"politics"}>Politics</option>
          </select>
        </div>
        <div className="w-full min-h-screen">
          {result.length > 0 ? (
            <ul className="flex flex-wrap items-center py-7 w-full gap-2 justify-center">
              {(searchQueryResults.length > 0
                ? searchQueryResults
                : result
              ).map((video: any) => {
                return (
                  <div
                    key={video._id + Math.random()}
                    className="flex-1 min-w-[320px] max-w-[450px] border-slate-700 border p-2 rounded-xl relative"
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
              {!isloadVideos ? (
                searchQueryResults ? (
                  <SkeletonCard />
                ) : (
                  ""
                )
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
