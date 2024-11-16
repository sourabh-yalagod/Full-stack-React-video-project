import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/Redux/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useHandleLikes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const handleLikes = async ({ userId, videoId }) => {
    const response = await axiosInstance.post(
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
