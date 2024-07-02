import axios, { AxiosError } from "axios";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Subscrption = ({ apiResponse }: any) => {
  const navigate = useNavigate();
  const handleSubscription = async () => {
    // setIsSubscribed(!isSubscribed);
    try {
      const response = await axios.post(`/api/v1/users/handle-subscribers`, {
        ChannelId: apiResponse?.owner,
      });
      console.log("Handle Subscription Response :", response.data);
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
    }
  };
  return (
    <div className="flex w-full bg-slate-200 dark:bg-slate-800 my-1 rounded-xl p-1 gap-2 text-slate-700 dark:text-white items-center justify-center border-slate-500 border-[1px]">
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

        <div className="flex items-center">
          <button
            onClick={() => handleSubscription()}
            className={`${
              apiResponse?.Uploader?.isSubscribed ? "bg-gray-700" : "bg-red-600"
            } text-white py-1 px-3 rounded-xl sm:text-xl md:text-2xl`}
          >
            <p className="flex gap-2 items-center">
              Subscribe
              {apiResponse?.Uploader?.isSubscribed ? (
                <Bell className="size-4 sm:size-6 md:size-8" />
              ) : (
                ""
              )}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscrption;
