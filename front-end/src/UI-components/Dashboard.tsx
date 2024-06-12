import axios from "axios";
import { EllipsisVertical, Loader2, StopCircle } from "lucide-react";
import { useEffect, useState } from "react";

import PlatForm from "./PlatForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearLoggedUser } from "@/Redux/Slice/SignIn";
import { calclulateVideoTime } from "./CalculateTime.ts";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState([]);
  // const [videoDuration, setVideoDuration]:any = useState(null);
  const signUpState = useSelector((state) => state);
  console.log("Dashboard", signUpState);
  // const [duration, setDuration]:any = useState({ hours: 0, minutes: 0, seconds: 0 });

  const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    dispatch(clearLoggedUser());
    navigate("/");
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const response = await axios.get(
          `/api/v1/dashboard${searchQuery ? "/search-video?" : ""}`,
          {
            params: {
              search: searchQuery,
            },
            signal: signal,
          }
        );
        console.log("response.data.data : ", response.data[0]);
        setResult(response.data);
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
      }
    })();

    return () => {
      controller.abort();
    };
  }, [searchQuery]);
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
  return (
    <div className="min-h-screen w-full grid relative place-items-center mx-auto">
      <div className="min-h-screen w-full p-2 grid place-items-center">
        <div className="flex w-full justify-between items-center absolute top-7">
          <PlatForm />
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Search Here....."
            className="max-w-[500px] mr-7 md:mx-4 relative w-full min-w-[250px] h-8 text-xl outline-none border-white bg-transparent text-white border-[1px] rounded-xl pl-2 leading-8 "
          />
          <div className="hidden md:block mr-4 lg:mr-12">
            {!localStorage.getItem("accessToken") ? (
              <button
                onClick={() => navigate("signin")}
                className="text-[15px] mx-1 font-semibold bg-blue-600 px-3 py-1 rounded-2xl text-white"
              >
                Sign-In
              </button>
            ) : (
              <button
                onClick={() => signOut()}
                className="text-[15px] mx-1 font-semibold bg-red-600 px-3 py-1 rounded-2xl text-white"
              >
                Sign-Out
              </button>
            )}
          </div>
        </div>
        <div className="mt-10 w-full min-h-auto grid place-items-center md:mt-16">
          {result.length > 0 ? (
            <ul
              className="mt-8 grid place-items-start space-y-2 justify-center w-full min-h-screen 
            sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-2 md:m-3 md:min-w-1/3"
            >
              {result.map((video: any) => {
                // useEffect(() => {
                //   const duration = calclulatevideoDuration(video.duration);
                //   setDuration(duration);
                // }, [video.duration]);

                return (
                  <div
                    key={video._id}
                    className="relative z-20 bg-[#212121] min-w-[290px] sm:min-w-1/2 sm:min-w-1/3 p-2 gap-2 rounded-2xl md:min-w-[250px] md:w-full  overflow-hidden"
                  >
                    <div className="relative">
                      <video
                        onClick={() => navigate(`/${video._id}`)}
                        className="w-full object-cover"
                        poster={video.thumbnail}
                        src={video.videoFile}
                      />

                      <div className="absolute bg-black bottom-1 px-[3px] py-[1px] rounded-lg text-center right-1 text-white">
                        {/* {duration.hours}h {duration.minutes}m {duration.seconds}s */}
                        {Math.floor(video.duration)}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-white absolute right-2 bottom-[5%] z-10">
                        <EllipsisVertical className="outline-none" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="text-white text-[13px] space-y-2 grid border-white rounded-xl text-center w-fit mr-8">
                        <div className="px-2 py-1 rounded-xl bg-slate-900 hover:bg-blue-600 hover:scale-95 transition-all pb-2 active:bg-blue-800">
                          save to watch later
                        </div>
                        <div className="px-2 py-1 rounded-xl hover:bg-red-600 bg-slate-900 hover:scale-95 transition-all pb-2 active:bg-blue-800">
                          delete video
                        </div>
                        <a
                          type="download"
                          className="px-2 py-1 rounded-xl hover:bg-blue-600 hover:scale-95 bg-slate-900 transition-all pb-2 active:bg-blue-800"
                          href={video.videoFile}
                        >
                          download
                        </a>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex items-center gap-1 w-full overflow-scroll mt-2 relative">
                      <img
                        onClick={() =>
                          navigate(`/signin/user-profile/${video.owner._id}`)
                        }
                        src={video.avatar}
                        className="w-9 h-9 rounded-full border-2 border-white"
                        alt="Avatar"
                      />
                      <div className="grid gap-1 pl-1">
                        <p className="text-white text-[16px] ml-2 overflow-hidden">
                          {video.title.slice(0, 32)}
                        </p>
                        <div className="flex gap-3 text-[13px]">
                          <p className="text-slate-600 ">
                            {video.owner.username}
                          </p>
                          <p className="text-slate-600 ">views {video.views}</p>
                          <p className="text-slate-600 ">
                            {calclulateVideoTime(video.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ul>
          ) : (
            <p className="text-3xl text-center text-white">
              <Loader2 className="text-white text-8xl text-center animate-spin mt-10" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
