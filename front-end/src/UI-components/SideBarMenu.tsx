import { clearLoggedUser } from "@/Redux/Slice/SignIn";
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
  LucideMenu,
  Settings,
  Upload,
  UserCheck2,
  UserCircle,
  UserCogIcon,
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
    dispatch(clearLoggedUser());
    navigate("/");
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
          <LucideMenu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-slate-900 bg-opacity-40 max-w-[250px] w-full text-white sm:max-w-[290px] md:max-w-[320px] lg:max-w-[350px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-4 p-4 text-xl">
            <Home className="w-6 h-6" />
            Home
          </SheetTitle>
          <div className="hidden md:block mr-4 lg:mr-12">
            {!localStorage.getItem("accessToken") ? (
              <button
                onClick={() => navigate("signin")}
                className="text-[15px] mx-1 font-semibold bg-blue-600 px-3 py-1 rounded-2xl text-white"
              >
                Sign-In
              </button>
            ) : (
              <button
                onClick={() => signOut()}
                className="text-[15px] mx-1 font-semibold bg-red-600 px-3 py-1 rounded-2xl text-white"
              >
                Sign-Out
              </button>
            )}
          </div>
        </SheetHeader>
        <div className="grid gap-4 p-4 overflow-auto text-white">
          <div
            className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() => navigate("signup")}
          >
            <UserCheck2 className="w-6 h-6" />
            <span>Create Account</span>
          </div>
          <div
            className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() => navigate("signin/upload-video")}
          >
            <Upload className="w-6 h-6" />
            <span>Upload Video</span>
          </div>
          <div
            className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() => navigate(`signin/user-profile/${userId}`)}
          >
            <UserCogIcon className="w-6 h-6" />
            <span>My Profile</span>
          </div>
          <div
            className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("userId");
              dispatch(clearLoggedUser());
              navigate("/");
            }}
          >
            <UserCircle className="w-6 h-6" />
            <span>Sign-Out</span>
          </div>
          <div
            className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() =>
              navigate(
                `signin/settings/customize-profile/${localStorage.getItem(
                  "userId"
                )}`
              )
            }
          >
            <Settings className="w-6 h-6" />
            <span>Customize</span>
          </div>
          <div
            className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() =>
              navigate(
                `signin/all-favourate-videos/${localStorage.getItem("userId")}`
              )
            }
          >
            <Heart className="w-6 h-6" />
            <span>Liked Videos</span>
          </div>
          <div
            className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
            onClick={() =>
              navigate(`signin/watch-history/${localStorage.getItem("userId")}`)
            }
          >
            <ViewIcon className="w-6 h-6" />
            <span>Watch History</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
