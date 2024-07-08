import axios from "axios";
import { Loader2 } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "./BottomNavBar.tsx";
import { SkeletonCard } from "@/utils/Skeleton.tsx";
import Video from "@/utils/Video.tsx";
import VideoNotFound from "@/utils/VideoNotFound.tsx";
import APIloading from "@/utils/APIloading.tsx";
import APIError from "@/utils/APIError.tsx";
import { sortArray } from "@/Services/sortArray.ts";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useAddToWatchLater } from "@/hooks/AddToWatchLater.ts";
import { useSignOut } from "@/hooks/SignOut.ts";
const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResults, setSearchQueryResults]: any = useState([]);
  const [error, setError]: any = useState("");
  const [sort, setSort] = useState("");
  const [result, setResult]: any = useState([]);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloadVideos, setIsLoadVideos] = useState(true);
  const { addToWatchLater, watchLaterLoading } = useAddToWatchLater();
  const debounced = useDebounceCallback(setSearchQuery, 500);
  const {signOut} = useSignOut()
  const { toast } = useToast();

  window.addEventListener("scroll", () => {
    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 200
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
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/dashboard?limit=${limit}&pages=${pages}`,
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

  const searchQueryResult = useCallback(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/dashboard/search-video?search=${searchQuery}`
        );
        setError("");
        setSearchQueryResults(response?.data?.data);
        console.log(searchQueryResults);
      } catch (error: any) {
        (() => {
          toast({
            title: "Error while search......!",
            description: error?.response?.message,
            variant: "destructive",
          });
        })();
        navigate(0);
      } finally {
        setIsLoading(false);
        setSearchQuery("");
      }
    })();
  }, [searchQuery]);

  useEffect(() => {
    let sortedArray = sortArray(result, sort);
    setResult(sortedArray);
  }, [sort]);
  return (
    <div className="min-h-screen transition-all w-full flex relative place-items-center py-3 dark:bg-gray-900 bg-white">
      {/* <select className="absolute top-0" onChange={(e) => setSort(e.target.value)}>
        
        <option value="_">None</option>
        <option value="new">new</option>
        <option value="old">old</option>
        <option value="views">views</option>
        <option value="duration">duration</option>
      </select> */}
      {loading && <APIloading />}
      {error && <APIError />}
      {/* only display for mobile screen */}
      <BottomNavBar />

      <div className="min-h-screen w-full p-2 grid place-items-center transition-all">
        <div className="flex w-full gap-3 sm:justify-between justify-center items-center">
          <div className="w-full max-w-[500px] min-w-[270px] gap-4 relative overflow-hidden">
            <input
              type="text"
              onChange={(e) => debounced(e.target.value)}
              defaultValue={searchQuery}
              placeholder="Search Here....."
              className="bg-transparent pl-4 text-gray-700 dark:text-slate-400 grid place-items-center text-[20px] w-full border-gray-700 dark:border-slate-400 outline-none border-[1px] p-2 rounded-xl"
            />
            <button
              onClick={() => searchQueryResult()}
              className="absolute right-0 inset-y-0 bg-blue-600 text-white px-3 rounded-l-3xl rounded-xl"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Search"}
            </button>
          </div>
          <div className="hidden sm:block mr-2 lg:mr-10">
            {!localStorage.getItem("userId") ? (
              <button
                onClick={() => navigate("/signin")}
                className="text-[18px] mx-1 font-semibold bg-blue-600 px-3 py-1 rounded-2xl text-white"
              >
                Sign-In
              </button>
            ) : (
              <button
                onClick={() => signOut()}
                className="text-[18px] font-semibold bg-red-600 px-3 py-1 rounded-xl text-white"
              >
                Sign-Out
              </button>
            )}
          </div>
        </div>
        <div className="mt-10 w-full min-h-screen">
          {result.length > 0 ? (
            <ul className="flex flex-wrap items-center w-full gap-2 justify-center">
              {(searchQueryResults.length > 0
                ? searchQueryResults
                : result
              ).map((video: any) => {
                return (
                  // flex flex-wrap items-center w-full gap-2 justify-center
                  // flex-1 min-w-[320px] max-w-[450px] border-slate-700 border p-2 rounded-xl relative
                  <div
                    key={video._id}
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
                <p className="absolute my-2 animate-pulse bottom-0 text-xl text-white w-full text-center">
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
