import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHandleLikes = () => {
  const navigate = useNavigate();
  const [likeResponse, setLikeResponse] = useState("");
  const [likeError, setLikeError] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);
  const {toast}=useToast()
  const handleLikes = async ({ userId, videoId }: any) => {
    console.log({ userId, videoId });
    setLikeLoading(true);
    try {
      const response = await axios.post(
        `/api/v1/likes/toggle-like-status/${videoId}`,
        {
          userId: userId,
        }
      );
      setLikeResponse(response.data.data);
      console.log("likeResponse : ", response.data);
      navigate(0);
      
    } catch (error) {
      const axiosError: any = error as AxiosError;
      setLikeError(axiosError);
      toast({
        title:error?.message,
        duration:2000
      })
    } finally {
      setLikeLoading(false);
    }
  };
  return { likeError, handleLikes, likeResponse,likeLoading };
};
