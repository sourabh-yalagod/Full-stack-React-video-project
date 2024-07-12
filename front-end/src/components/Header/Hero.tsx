import { SideMenuBar } from "@/components/SideBarMenu";
import { useSignOut } from "@/hooks/SignOut";
import { getUserId } from "@/Services/Auth";
import { ThemeButton } from "@/utils/ThemeButtom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { UserCircle, UserMinus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../NavigateButton";

const Hero = () => {
  const navigate = useNavigate();
  const { signOut } = useSignOut();
  const userId = localStorage.getItem("userId") || getUserId().userId;
  
  return (
    <div className="w-full px-5 py-2 z-30 shadow-[0_0px_20px_1px_black] overflow-hidden flex justify-between items-start text-slate-800 dark:bg-slate-900 dark:text-slate-500 relative">
      <div className="flex items-center gap-3">
        <SideMenuBar />
        <div
          onClick={() => navigate("/")}
          className="flex gap-2 items-center justify-around cursor-pointer"
        >
          <img
            className="size-9 rounded-full"
            src={
              "https://lh3.googleusercontent.com/rormhrw_yZt2v1OKZBaiFCSt8b8QU02kEKiuilfgnpGkOMQd87xm7b7SyIlGoHsL18M"
            }
          />
          <p className="text-slate-800 text-xl tracking-widest font-bold dark:text-white">
            Video-Tube
          </p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex items-center gap-5">
        <ThemeButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UserCircle className="dark:text-white text-slate-900" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-10 mt-1 border rounded-[5px] py-2 px-5 space-y-3 dark:bg-slate-900 bg-slate-200">
              <DropdownMenuItem
                onClick={() =>
                  navigate(`/signin/settings/customize-profile/${userId}`)
                }
                className="outline-none cursor-pointer text-slate-800 hover:scale-105 transition-all text-[14px]    dark:text-white"
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate(`/signin/user-profile/${userId}`)}
                className="outline-none cursor-pointer text-slate-800 hover:scale-105 transition-all text-[14px]    dark:text-white"
              >
                My Profile
              </DropdownMenuItem>
              {userId ? (
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="outline-none cursor-pointer text-slate-800 hover:scale-105 transition-all text-[14px]  dark:text-white"
                >
                  <p className="flex gap-3">
                    <UserMinus className="size-5" />
                    Sign-out
                  </p>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => navigate("/signin")}
                  className="outline-none cursor-pointer text-slate-800 hover:scale-105 transition-all text-[14px]  
              dark:text-white"
                >
                  <p className="flex gap-3">
                    <UserPlus className="size-5" />
                    Sign-in
                  </p>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <NavigateButton />
      </div>
    </div>
  );
};
export default Hero;
