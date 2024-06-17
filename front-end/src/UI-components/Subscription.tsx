import axios, { AxiosError } from "axios";
import { Loader2, LucideTrash2, NutOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calclulateVideoTime } from "./CalculateTime";
import { SideMenuBar } from "./SideBarMenu";

const Subscription = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [apiResponse, setapiResponse]: any = useState("");
  const [loading, setLoading]: any = useState(false);
  const [error, setError]: any = useState("");
  const [order, setOrder]= useState('');
  console.log(userId);

  // Api request for Subscription videos
  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("Fetching profile for UserId:", userId);
      try {
        setError("");
        const response = await axios.get(
          `/api/v1/users/subscriptions-status/${localStorage.getItem("userId")}`
        );
        setapiResponse(response?.data?.data);
        console.log("Response from Subscription : ",apiResponse);
        
      } catch (error) {
        const err = error as AxiosError;
        setError(err.message ?? "Error while API call");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

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
  
  const asc = apiResponse?.videos?.sort((a:any, b:any) => {
    return new Date(a?.video?.createdAt) - new Date(b?.video?.createdAt);
  });
  console.log(apiResponse.videos);
  
  return (
    <div className="min-h-screen w-full px-3 bg-#121212 pt-16 relative">
      <div>
        <h1 className="text-center text-white text-3xl tracking-wider font-black">Subscription</h1>
        <SideMenuBar />
        {apiResponse?.videos?.length > 0 ? (
          <ul
          className="flex justify-center flex-wrap gap-3 py-5"
          >
            {asc.map((video: any) => {
              return (
                <div
                key={video.video._id}
                className="flex-1 min-w-[320px] border-slate-700 p-2 rounded-xl border-[1px] relative"
                >
                  <div className="relative">
                    <video
                      onClick={() => navigate(`/${video?.video?._id}`)}
                      className="w-full object-cover"
                      poster={video?.video?.thumbnail}
                      src={video?.video?.videoFile}
                    />
                    <div className="absolute bg-black bottom-1 px-1 py-[1px] rounded-lg text-center right-1 text-white">
                      {Math.floor(video?.video?.duration)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 w-full overflow-scroll mt-2 relative">
                    <img
                      onClick={() =>
                        navigate(`/signin/user-profile/${apiResponse?._id}`)
                      }
                      src={video?.video?.Uploader?.avatar ?? ""}
                      className="w-9 h-9 rounded-full border-2 border-white"
                    />
                    <div className="grid gap-1 pl-1">
                      <p className="text-white text-[16px] ml-2 overflow-hidden">
                        {video?.video?.title?.length > 28 ? (
                          <>{video?.video?.title?.slice(0, 25)}. . . . .</>
                        ) : (
                          video?.video?.title
                        )}
                      </p>
                      <div className="flex gap-3 text-[13px]">
                        <p className="text-slate-600 ">
                          {video?.video?.Uploader.username}
                        </p>
                        <p className="text-slate-600 ">views {video?.video?.views}</p>
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
            <LucideTrash2 className="text-white size-12 text-center" /><p>No videos . . . . .</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;
