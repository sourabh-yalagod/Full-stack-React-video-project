import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "./Video";
import { Loader2 } from "lucide-react";

const MyProfile = () => {
  const [result,setResult]=useState([])
  const { userId } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/v1/user-profiles/user-profile/${userId}`);
        console.log(response.data);
        setResult(response.data)
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    })();
  }, [userId]);
  return (
    <div>
      <div className="mt-10 w-full min-h-auto grid place-items-center md:mt-16">
          {result.length > 0 ? (
            <ul
              className="mt-8 grid place-items-start space-y-2 justify-center w-full min-h-screen 
            sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-2 md:m-3 md:min-w-1/3"
            >
              {result.map((video: any) => {
                return (
                  <Video
                    key={video.videoFile}
                    title={video.title}
                    avatar={video.avatar}
                    thumbnail={video.thumbnail}
                    link={video.videoFile}
                  />
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
  )
};

export default MyProfile;
