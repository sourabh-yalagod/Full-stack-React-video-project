import { useSignOut } from "@/hooks/SignOut";
import userAuth from "@/Services/Auth";
import { Loader, UserRoundMinusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { menuBarItems } from "@/utils/MenuBar";

const StickySideMenu = ({ location }) => {
  const { signOut, signOutLoading } = useSignOut();
  const [clicked,setCliked]=useState(false)
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userId } = userAuth();
  useEffect(() => {
    if (!userId && clicked) {
      toast({
        title: "Please sign-in",
        description:
          "To get Access to all pages please authenticate your account . . . . . ",
        variant: "destructive",
        duration: 1500,
      });
      console.log("from Here");
      navigate("/signin");
    }
  }, []);

  return (
    <div onClick={()=>setCliked(true)} className="fixed px-2 space-y-2 group min-w-12 hover:min-w-56 bg-gray-100 transition-all pt-16 h-full left-0 inset-y-0 hidden sm:block z-20 dark:bg-black shadow-[0.1px_0.1px_15px_0.1px_black]">
      {menuBarItems.map((item, index) => (
        <div
          key={index}
          className="relative flex items-center gap-2 p-2 cursor-pointer rounded-xl hover:bg-slate-200 transition-transform transform hover:scale-105 group dark:hover:bg-gray-900"
          onClick={() => navigate(item?.link)}
        >
          {item?.icon}
          <p className="absolute left-full rounded-xl whitespace-nowrap transition-all duration-500 transform translate-x-[-100%] opacity-0 group-hover:translate-x-10 group-hover:left-0 group-hover:opacity-100 group-hover:w-auto group-hover:pl-2 group-hover:py-1">
            {item.text}
          </p>
        </div>
      ))}
      <div
        className="flex relative items-center gap-4 py-2 px-3 cursor-pointer rounded-xl transition-transform transform hover:scale-105 group dark:hover:bg-gray-900 hover:bg-slate-200"
        onClick={() => signOut()}
      >
        <UserRoundMinusIcon className="w-6 h-6" />
        <p className="absolute left-full rounded-xl whitespace-nowrap transition-all duration-500 transform translate-x-[-100%] opacity-0 group-hover:translate-x-10 group-hover:left-0 group-hover:opacity-100 group-hover:w-auto group-hover:pl-2 group-hover:py-1">
          {signOutLoading ? (
            <div className="flex gap-2 ">
              <Loader className="animate-spin" />
              sign-out
            </div>
          ) : (
            "sign-out"
          )}
        </p>
      </div>
    </div>
  );
};

export default StickySideMenu;
