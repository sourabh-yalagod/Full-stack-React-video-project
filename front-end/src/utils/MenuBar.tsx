import { useToast } from "@/components/ui/use-toast";
import { useSignOut } from "@/hooks/SignOut";
import { getUserId } from "@/Services/Auth";
import {
  History,
  PictureInPicture,
  PlaySquareIcon,
  Settings,
  ThumbsUp,
  UploadIcon,
  User,
  UserPlus2,
  UserRoundMinusIcon,
  Videotape,
} from "lucide-react";
import { useEffect, useId } from "react";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const { toast } = useToast();
  const { signOut } = useSignOut();
  let userId = getUserId()?.userId || localStorage?.getItem("userId");
  useEffect(() => {
    if (!userId) {
      toast({
        title: "Please Signin to explore Menubar",
        description: "",
        variant: "default",
        duration: 2200,
      });
      navigate("/signin");
    }
  }, []);
  const navigate = useNavigate();
  const menuBar = [
    {
      text: "Craete Account",
      link: "/signup",
      icon: <UserPlus2 className="size-6" />,
    },
    {
      text: "Sign-In",
      link: "/signin",
      icon: <User className="size-6" />,
    },
    {
      text: "Upload Video",
      link: "/signin/upload-video",
      icon: <UploadIcon className="size-6" />,
    },
    {
      text: "My-Playlists",
      link: `/signin/video-play-lists/${userId}`,
      icon: <PlaySquareIcon className="size-6" />,
    },
    {
      text: "My-Profile",
      link: `/signin/user-profile/${userId}`,
      icon: <PictureInPicture className="size-6" />,
    },
    {
      text: "Watch-Later",
      link: `/signin/watch-later-videos/${userId}`,
      icon: <Videotape className="size-6" />,
    },
    {
      text: "Customize-Channel",
      link: `/signin/settings/customize-profile/${userId}`,
      icon: <Settings className="size-6" />,
    },
    {
      text: "Favorate-Videos",
      link: `/signin/all-favourate-videos/${userId}`,
      icon: <ThumbsUp className="size-6" />,
    },
    {
      text: "Watch-History",
      link: `/signin/watch-history/${userId}`,
      icon: <History className="size-6" />,
    },
  ];

  return (
    <div className="grid justify-around mt-10 text-white space-y-2">
      {menuBar.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
          onClick={() => navigate(item?.link)}
        >
          {item?.icon}
          <span>{item?.text}</span>
        </div>
      ))}
      <div
        className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-700 rounded-xl  transition-transform transform hover:scale-105"
        onClick={() => signOut()}
      >
        <UserRoundMinusIcon className="w-6 h-6" />
        <span>Sign-Out</span>
      </div>
    </div>
  );
};

export default MenuBar;
