import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Heart,
  Home,
  Images,
  LucideMenu,
  Settings,
  Upload,
  User,
  UserCheck2,
  UserRoundMinusIcon,
  VideotapeIcon,
  View,
  ViewIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function SideMenuBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="focus:outline-none focus:ring-2 focus:ring-offset-2 absolute left-0 top-3 z-10 ">
          <LucideMenu className="text-slate-900 dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-slate-900 bg-opacity-40 max-w-[250px] w-full text-white sm:max-w-[290px] md:max-w-[320px] lg:max-w-[350px]">
        <SheetHeader>
          <SheetTitle className="flex items-center w-full justify-around text-[15px] sm:text-xl">
            <div
              onClick={() => navigate("/")}
              className="flex gap-5 cursor-pointer hover:scale-105 transition-all"
            >
              <Home />
              <p>Home</p>
            </div>
            <div className="mr-4 lg:mr-12 text-[12px] sm:text-[15px] mx-1 font-semibold cursor-pointer hover:scale-105 transition-all">
              {!localStorage.getItem("accessToken") ? (
                <button
                  onClick={() => navigate("signin")}
                  className="bg-blue-600 px-3 py-1 rounded-2xl text-white "
                >
                  Sign-In
                </button>
              ) : (
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 px-3 py-1 rounded-2xl text-white"
                >
                  Sign-Out
                </button>
              )}
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="grid justify-around mt-5 text-white space-y-1">
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() => navigate("/signup")}
          >
            <UserCheck2 className="w-6 h-6" />
            <span>Create Account</span>
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() => navigate("/signin")}
          >
            <User className="" />
            <label>Sign In</label>
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() => navigate("/signin/upload-video")}
          >
            <Upload className="w-6 h-6" />
            <span>Upload Video</span>
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() =>
              navigate(
                `/signin/video-play-lists/${localStorage.getItem("userId")}`
              )
            }
          >
            <VideotapeIcon className="w-6 h-6" />
            <span>My Playlist</span>
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/user-profile/${userId}`)}
          >
            <Images className="w-6 h-6" />
            <span>My Profile</span>
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() => navigate(`/signin/watch-later-videos/${userId}`)}
          >
            <View className="w-6 h-6" />
            Watch-Later
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() =>
              navigate(
                `/signin/settings/customize-profile/${localStorage.getItem(
                  "userId"
                )}`
              )
            }
          >
            <Settings className="w-6 h-6" />
            <span>Customize</span>
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() =>
              navigate(
                `/signin/all-favourate-videos/${localStorage.getItem("userId")}`
              )
            }
          >
            <Heart className="w-6 h-6" />
            <span>Liked Videos</span>
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() =>
              navigate(
                `/signin/watch-history/${localStorage.getItem("userId")}`
              )
            }
          >
            <ViewIcon className="w-6 h-6" />
            <p>Watch History</p>
          </div>
          <div
            className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("userId");
              navigate("/");
            }}
          >
            <UserRoundMinusIcon className="w-6 h-6" />
            <span>Sign-Out</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
