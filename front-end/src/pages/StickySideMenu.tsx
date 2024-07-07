import { useSignOut } from "@/hooks/SignOut";
import { ThemeButton } from "@/utils/ThemeButtom";
import {
  Heart,
  Home,
  Images,
  Loader2,
  Settings,
  Upload,
  User,
  UserCheck2,
  UserRoundMinusIcon,
  Videotape,
  VideotapeIcon,
  View,
  ViewIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StickySideMenu = ({ location }: any) => {
  const {signOut,signOutLoading} = useSignOut()
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  return (
    <div className="fixed px-3 min-w-16 transition-all h-full left-0 inset-y-0 hidden sm:block z-20 bg-slate-100 dark:bg-slate-900">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 mt-4 dark:text-white dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
      >
        <Home />
      </div>
      {!["/signup", "/signin"].includes(location) ? (
        <div className="grid justify-around mt-5 text-black dark:text-white space-y-1">
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate("/signup")}
          >
            <UserCheck2 className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate("/signin")}
          >
            <User className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate("/signin/upload-video")}
          >
            <Upload className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/video-play-lists/${userId}`)}
          >
            <VideotapeIcon className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/user-profile/${userId}`)}
          >
            <Images className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/watch-later-videos/${userId}`)}
          >
            <View className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/settings/customize-profile/${userId}`)}
          >
            <Settings className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/subscription-status/${userId}`)}
          >
            <Videotape className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/all-favourate-videos/${userId}`)}
          >
            <Heart className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/watch-history/${userId}`)}
          >
            <ViewIcon className="w-6 h-6" />
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105"
            onClick={
              () => signOut()
            //     {
            //   localStorage.removeItem("accessToken");
            //   localStorage.removeItem("userId");
            //   navigate("/");
            // }
          }
          >
            {signOutLoading?<Loader2 className="animate-spin" />:<UserRoundMinusIcon className="w-6 h-6" />}
          </div>
          <div className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105">
            <ThemeButton />
          </div>
        </div>
      ) : (
        <div className="flex mt-8 items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105">
          <ThemeButton />
        </div>
      )}
    </div>
  );
};

export default StickySideMenu;
