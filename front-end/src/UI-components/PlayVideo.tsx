import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIloading from "@/utils/APIloading";
import APIError from "@/utils/APIError";
import VideoController from "@/components/VideoController";
import Subscrption from "@/components/Subscrption";
import VideoFigures from "@/components/VideoFigures";
import Description from "@/components/Description";
import Comments from "@/components/Comments";

const PlayVideo = () => {
  const { videoId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [apiResponse, setApiResponse]: any = useState({});
  const [allComments, setAllComments] = useState([]);
  console.log("allComments : ", allComments);
  console.log(apiResponse);

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/api/v1/videos/get-video/${videoId}`,
          { signal: controller.signal }
        );
        setApiResponse(response.data.data);
        console.log("ApiResponse : ", apiResponse);
        setAllComments(apiResponse?.allComments);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        const axiosError = error as AxiosError;
        setError(axiosError);
        setLoading(false);
      }
    })();
  }, [videoId]);

  if (error) {
    return <APIError />;
  }

  if (loading) {
    return <APIloading />;
  }
  return (
    <div className="w-full grid p-1 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 pb-10 mx-auto">
      <VideoController apiResponse={apiResponse} />
      <Subscrption apiResponse={apiResponse} />
      <VideoFigures apiResponse={apiResponse} videoId={videoId}/>
      <Description apiResponse={apiResponse}/>
      <Comments apiResponse={apiResponse} videoId={videoId}/>
    </div>
  );
};
export default PlayVideo;
