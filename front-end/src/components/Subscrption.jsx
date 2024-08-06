import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Bell, Loader, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import axiosInstance from "@/Redux/api/axiosInstance";

const Subscrption = ({ apiResponse }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleSubscription = async ({ ChannelId }) => {
    const response = await axiosInstance.post(`/api/v1/users/handle-subscribers`, {
      ChannelId,
    });
    return response?.data;
  };
  const subscriptionMutation = useMutation({
    mutationFn: handleSubscription,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["playVideo"] });
      toast({
        title: "Subscription status Toggled succesffuly . . . .!",
        description: `At  + ${time.toLocaleTimeString()}`,
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: error?.message || "failed please try again . . . . . !",
        description: "At " + time.toLocaleTimeString(),
        variant: "destructive",
        duration: 3000,
      });
      console.log('error');
    },
  });
  return (
    <div className="flex w-full px-2 bg-slate-200 dark:bg-black my-1 rounded-xl p-1 gap-2 text-slate-700 dark:text-white items-center justify-center border-slate-500 border-[1px]">
      <div className="flex w-full items-center justify-around gap-10">
        <div className="flex items-center gap-2 justify-between relative">
          <img
            onClick={() =>
              navigate(`/signin/user-profile/${apiResponse?.Uploader?._id}`)
            }
            className="rounded-full w-10 h-10 sm:h-12 sm:w-12"
            src={apiResponse?.Uploader?.avatar}
            alt="https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
          />
          <div className="flex items-center gap-4 justify-center">
            <p className="flex">{apiResponse?.Uploader?.username}</p>
            <p className="flex text-[13px] text-slate-500 sm:text-[18px]">
              Subscribers : {apiResponse?.Uploader?.subscriberCount ?? " 0"}
            </p>
          </div>
        </div>

        <div
          className="flex items-center"
        >
          <button
            onClick={() =>
              subscriptionMutation.mutate({ ChannelId: apiResponse?.owner })
            }
            className={`${
              apiResponse?.Uploader?.isSubscribed ? "bg-gray-700" : "bg-red-600"
            } text-white py-1 px-2 rounded-xl sm:text-[15px] tracking-widest grid place-items-center`}
          >
            {subscriptionMutation.isPending ? (
              <div className="flex gap-2">
                <Loader className="animate-spin" />
                <p className="flex gap-2 items-center">
                  Subscribe
                  {apiResponse?.Uploader?.isSubscribed && (
                    <Bell className="size-3 sm:size-4 md:size-5" />
                  )}
                </p>
              </div>
            ) : (
              <p className="flex gap-2 items-center">
                Subscribe
                {apiResponse?.Uploader?.isSubscribed && (
                  <Bell className="size-3 sm:size-4 md:size-5" />
                )}
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscrption;
