import axios, { AxiosError } from "axios";
import { EllipsisVertical, Loader2, StopCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
// import debounce from 'lodash/debounce';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { calclulateVideoTime } from "./CalculateTime.ts";
// import { signOut } from "./services/SignOut.ts";
import BottomNavBar from "./BottomNavBar.tsx";
import { TitleFormatar } from "@/Services/TitleFormater.ts";
import FullPageLoading from "@/utils/FullPageLoading.tsx";
import { SkeletonCard } from "@/utils/Skeleton.tsx";
import { formatVideoDuration } from "@/Services/FormateVideoDuration.ts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError]: any = useState("");
  const [result, setResult]: any = useState([]);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [isloadVideos, setIsLoadVideos] = useState(true);
  // signout function
  const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/");
  };

  // add to watchlater videos
  const addToWatchLater = async (videoId: any) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(`/api/v1/users/watch-later`, {
        videoId,
      });
      console.log("Response from add to watch later : ", response.data);
    } catch (error: any) {
      const axiosError = error as AxiosError;
      setError(axiosError);
    } finally {
      setIsLoading(false);
    }
  };

  // track the user scrolling behaviour
  // console.log("scrollHeight : ", document.documentElement.scrollHeight);
  // console.log("innerHeight  : ", window.innerHeight);
  // console.log("scrollTop  : ", document.documentElement.scrollTop);

  window.addEventListener("scroll", () => {
    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 200
    ) {
      setTimeout(() => {
        setIsLoadVideos(true);
      }, 1000);
    }
  });

  // API call to display all the video on dashboard
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const response = await axios.get(
          `/api/v1/dashboard?limit=${limit}&pages=${pages}`,
          {
            signal: signal,
          }
        );
        setLimit(5);
        console.log("API request : ", result);

        if (isloadVideos && response.data.length) {
          setPages((pages) => pages + 1);
          setResult((prev: any) => [...prev, ...response.data]);
          setIsLoadVideos(false);
          
        }
        console.log("isloadVideos : ",isloadVideos);
        // setResult((prev: any) => [...prev, ...response.data]);
        // console.log("Response for Dashboard : ", result);
        setError("");
        setSearchQuery("");
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data);
          alert(error);
        } else if (error.request) {
          setError("No response received from server.");
        } else {
          setError("Error: " + error.message);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [isloadVideos]);

  // API call when the search input is present
  const handleSearch = useCallback(async (search:string) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      // const debouseSearch = debounce(searchQuery)
      // console.log("debouseSearch : ",debouseSearch);
      
      setIsLoading(true);
      const response = await axios.get("/api/v1/dashboard/search-video?", {
        params: { search: search },
        signal: signal,
      });
      {
        signal;
      }
      setResult(response.data.data);
      console.log("Search Response:", response.data.data);
      setError("");
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data);
        alert("Error: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
    return () => {
      controller.abort();
    };
  }, []);

  // return if the API returns some errors
  if (error) {
    return (
      <div className="min-h-screen w-full grid place-items-center">
        <div className="text-white flex gap-3">
          <p>{error}</p>
          <p>
            <StopCircle />
          </p>
        </div>
      </div>
    );
  }
  window.addEventListener("keyup", (e) => {
    if (searchQuery) if (e.key == "Enter") handleSearch("Animal");
  });
  console.log("searchQuery : ",searchQuery);
  
  return (
    <div className="min-h-screen w-full grid relative place-items-center mx-auto dark:bg-gray-900 bg-white">
      <BottomNavBar />
      <div className="min-h-screen w-full p-2 grid place-items-center transition-all">
        <div className="flex w-full gap-3 sm:justify-between justify-center items-center">
          <div className="w-full max-w-[500px] min-w-[270px] gap-4 relative overflow-hidden">
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search Here....."
              className="bg-transparent pl-4 text-gray-700 dark:text-slate-400 grid place-items-center text-[20px] w-full border-gray-700 dark:border-slate-400 outline-none border-[1px] p-2 rounded-xl"
            />
            <button
              onClick={() => handleSearch(searchQuery)}
              className="absolute right-0 inset-y-0 bg-blue-600 text-white px-3 rounded-l-3xl rounded-xl"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Search"}
            </button>
          </div>
          <div className="hidden sm:block mr-2 lg:mr-10">
            {!localStorage.getItem("accessToken") ? (
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
        <div className="mt-8 w-full min-h-screen flex items-start justify-center">
          {result.length > 0 ? (
            <ul className="flex justify-center flex-wrap gap-3 py-5">
              {result.map((video: any) => {
                return (
                  <div
                    key={video._id}
                    className="flex-1 min-w-[320px] max-w-[500px] border-gray-700 dark:border-slate-700 p-2 rounded-xl border-[1px] relative"
                  >
                    {/* video projection */}
                    <div className="relative">
                      <video
                        onClick={() => navigate(`/${video?._id}`)}
                        className="w-full object-cover"
                        poster={video?.thumbnail}
                        src={video?.videoFile}
                      />

                      <div className="absolute bg-black bottom-0 rounded-[6px] text-[12px] p-1 right-0 text-white">
                        {formatVideoDuration(video?.duration)}
                      </div>
                    </div>

                    {/* three dot menu for some operations(add to watch later, download video) */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-gray-700 dark:text-white absolute right-2 bottom-[5%] z-10">
                        <EllipsisVertical className="outline-none" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="text-gray-700 dark:text-white text-[13px] grid space-y-1 border-gray-700 dark:border-slate-600 bg-opacity-50 cursor-pointer rounded-[7px] bg-gray-100 dark:bg-slate-900 text-center w-fit mr-8 p-0">
                        <div
                          onClick={() => addToWatchLater(video?._id)}
                          className="px-2 py-1 m-1 rounded-[9px] grid place-items-center transition-all pb-2 hover:bg-gray-200 dark:hover:bg-slate-800"
                        >
                          {isLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "save to watch later"
                          )}
                        </div>
                        <a
                          type="download"
                          className="px-2 py-1 m-1 rounded-[9px] transition-all pb-2 hover:bg-gray-200 dark:hover:bg-slate-800"
                          href={video?.videoFile}
                        >
                          download
                        </a>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Content displayed just below the video */}
                    <div className="flex items-center gap-1 w-full overflow-scroll mt-2 relative">
                      <img
                        onClick={() =>
                          navigate(`/signin/user-profile/${video?.owner?._id}`)
                        }
                        src={
                          video?.avatar ??
                          video?.owner?.avatar ??
                          "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                        }
                        className="w-9 h-9 rounded-full border-2 border-white"
                      />
                      <div className="grid gap-1 pl-1">
                        <p className="text-gray-700 dark:text-white text-[16px] ml-2 overflow-hidden">
                          {/* {video?.title?.length > 20
                        ? `${video?.title?.slice(0, 20)}....`
                        : video?.title} */}
                          {TitleFormatar(video.title)}
                        </p>
                        <div className="flex gap-3 text-[13px]">
                          <p className="text-gray-500 dark:text-slate-600 ">
                            {video?.owner?.username}
                          </p>
                          <p className="text-gray-500 dark:text-slate-600 ">
                            views {video?.views}
                          </p>
                          <p className="text-gray-500 dark:text-slate-600 ">
                            {calclulateVideoTime(video?.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {!isloadVideos ? <SkeletonCard/> : "No more videos to load"}
             
            </ul>
          ) : (
            <FullPageLoading />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
