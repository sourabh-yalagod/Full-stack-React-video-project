import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHandleLikes = () => {
  const navigate = useNavigate();
  const [likeResponse, setLikeResponse] = useState("");
  const [likeError, setLikeError] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const handleLikes = async ({ userId, videoId }) => {
    const response = await axios.post(
      `/api/v1/likes/toggle-like-status/${videoId}`,
      { userId }
    );
    return response?.data;
  };

  const likeMutation = useMutation({
    mutationFn: handleLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playVideo"] });
      toast({
        title: "Like handle Successfully . . . . .!",
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        title: error?.message,
        duration: 2000,
      });
    },
  });

  return {
    likeError: likeMutation?.error,
    handleLikes: likeMutation?.mutate,
    likeResponse: likeMutation?.data,
    likeLoading: likeMutation?.isPending,
  };
};
