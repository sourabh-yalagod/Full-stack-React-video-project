import axios, { AxiosError } from "axios";
import { Loader2, LucideTrash2, NutOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calclulateVideoTime } from "./CalculateTime";
const WatchHistory = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [apiResponse, setApiResponse]: any = useState("");
  const [loading, setLoading]: any = useState(false);
  const [error, setError]: any = useState("");
  console.log(userId);

  // API request for watch history videos
  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("Fetching profile for UserId:", userId);
      try {
        setError("");
        const response = await axios.get(
          `/api/v1/users/watch-history/${userId}`
        );
        setApiResponse(response?.data?.data);
        console.log("API Response:", apiResponse);
      } catch (error) {
        const err = error as AxiosError;
        setError(err.message ?? "Error while API call");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  // component renders when API is loading
  if (loading) {
    return (
      <div className="min-h-screen w-full px-3 bg-#121212 grid place-items-center">
        <p className="text-3xl text-center text-white">
          <Loader2 className="text-white size-5 text-center animate-spin mt-10" />
        </p>
      </div>
    );
  }

  // componet reders when API results some Errors
  if (error) {
    alert(error)
    return (
      <div className="min-h-screen w-full px-3 bg-#121212 grid place-items-center">
        <div className="text-white text-3xl flex gap-4">
          <NutOffIcon />
          Error (API)
        </div>
      </div>
    );
  }

  const clearWatchHistory = async () => {
    setLoading(true);
    console.log("Fetching profile for UserId:", userId);
    try {
      setError("");
      const response = await axios.put(`/api/v1/videos/clear-watchhistory`);
      setApiResponse(response?.data?.data);
      console.log("API Response:", apiResponse);
      navigate(0)
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message ?? "Error while API call");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid justify-center w-full px-3 bg-#121212 relative">
      <div className="mt-10 w-full min-h-auto grid md:mt-16">
        <button
        className="p-2 border-slate-700 border-[1px] rounded-xl text-white absolute top-1 right-1"
        onClick={()=>clearWatchHistory()}
        >Clear Watch history</button>
        {apiResponse?.videos?.length > 0 ? (
          <ul className="flex justify-center items-start flex-wrap gap-3 py-5">
            {apiResponse?.videos?.map((video: any) => {
              return (
                <div
                  key={video._id}
                  className="flex-1 min-w-[250px] max-w-[380px] border-slate-700 p-2 rounded-xl border-[1px] relative"
                >
                  <div className="relative">
                    <video
                      onClick={() => navigate(`/${video?._id}`)}
                      className="w-full object-cover"
                      poster={video?.thumbnail}
                      src={video?.videoFile}
                    />
                    <div className="absolute bg-black bottom-1 px-1 py-[1px] rounded-lg text-center right-1 text-white">
                      {Math.floor(video?.duration)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 w-full overflow-scroll mt-2 relative">
                    <img
                      onClick={() =>
                        navigate(`/signin/user-profile/${apiResponse._id}`)
                      }
                      src={apiResponse.avatar}
                      className="w-9 h-9 rounded-full border-2 border-white"
                      alt="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                    />
                    <div className="grid gap-1 pl-1">
                      <p className="text-white text-[16px] ml-2 overflow-hidden">
                        {video?.title?.length > 28 ? (
                          <>{video?.title?.slice(0, 25)}. . . . .</>
                        ) : (
                          video?.title
                        )}
                      </p>
                      <div className="flex gap-3 text-[13px]">
                        <p className="text-slate-600 ">
                          {apiResponse.username}
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
          <div className="text-3xl flex gap-5 min-h-screen w-full justify-center items-center mb-11 text-center text-white my-auto">
            <LucideTrash2 className="text-white size-12 text-center" />
            <p>Watch history is Empty. . . . .</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchHistory;
