import { useToast } from "@/components/ui/use-toast";
import { useSignOut } from "@/hooks/SignOut";
import userAuth from "@/Services/Auth";

import {
  CloudUpload,
  FileVideo2,
  GalleryVerticalEnd,
  Heart,
  History,
  Home,
  HomeIcon,
  LayoutDashboardIcon,
  ListVideo,
  Loader,
  Settings,
  Slack,
  User,
  UserPlus,
  UserPlus2,
  UserRoundMinusIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { userId } = userAuth();
//   {
//     text: "Home",
//     link: "/",
//     icon: <HomeIcon className="size-6" />,
//   },
//   {
//     text: "Create Account",
//     link: "/signup",
//     icon: <UserPlus2 className="size-6" />,
//   },
//   {
//     text: "Sign-In",
//     link: "/signin",
//     icon: <User className="size-6" />,
//   },
//   {
//     text: "Upload Video",
//     link: "/signin/upload-video",
//     icon: <UploadIcon className="size-6" />,
//   },
//   {
//     text: "My-Playlists",
//     link: `/signin/video-play-lists/${userId}`,
//     icon: <PlaySquareIcon className="size-6" />,
//   },
//   {
//     text: "My-Profile",
//     link: `/signin/user-profile/${userId}`,
//     icon: <PictureInPicture className="size-6" />,
//   },
//   {
//     text: "Watch-Later",
//     link: `/signin/watch-later-videos/${userId}`,
//     icon: <Videotape className="size-6" />,
//   },
//   {
//     text: "Customize-Channel",
//     link: `/signin/settings/settings/${userId}`,
//     icon: <Settings className="size-6" />,
//   },
//   {
//     text: "Favorate-Videos",
//     link: `/signin/all-favourate-videos/${userId}`,
//     icon: <ThumbsUp className="size-6" />,
//   },
//   {
//     text: "Subscription",
//     link: `/signin/subscription-status/${userId}`,
//     icon: <FileVideo2 className="size-6" />,
//   },
//   {
//     text: "Watch-History",
//     link: `/signin/watch-history/${userId}`,
//     icon: <History className="size-6" />,
//   },
//   {
//     text: "Dashboard",
//     link: `/signin/dashboard`,
//     icon: <BookDashed className="size-6" />,
//   },
// ];

const MenuBar = ({ userId }) => {
  const { toast } = useToast();
  const { signOut, signOutLoading } = useSignOut();
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
  return (
    <div className="grid justify-around space-y-[1px] z-10">
      {/* {menuBarItems.map((item, index) => (
        <div
          key={index}
          className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
          onClick={() => navigate(item?.link)}
        >
          {item?.icon}
          <span>{item?.text}</span>
          <hr className="w-full bg-white absolute bottom-0 inset-x-0" />
        </div>
      ))} */}
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate("/")}
      >
        <Home />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">Home</p>
      </div>
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate("/signup")}
      >
        <UserPlus />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">
          Create Account
        </p>
      </div>
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate("/signin")}
      >
        <User />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">signin</p>
      </div>
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate("/signin/upload-video")}
      >
        <CloudUpload />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">
          Upload-Video
        </p>
      </div>
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate(`/signin/video-play-lists/${userId}`)}
      >
        <ListVideo />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">
          My playlists
        </p>
      </div>
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate(`/signin/user-profile/${userId}`)}
      >
        <Slack />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">
          User-Profile
        </p>
      </div>
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate(`/signin/watch-later-videos/${userId}`)}
      >
        <History />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">
          watch-later
        </p>
      </div>
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate(`/signin/settings/${userId}`)}
      >
        <Settings />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">
          Settings
        </p>
      </div>
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate(`/signin/all-favourate-videos/${userId}`)}
      >
        <Heart />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">
          liked videos
        </p>
      </div>
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate(`/signin/subscription-status/${userId}`)}
      >
        <FileVideo2 />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">
          Subscription
        </p>
      </div>
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate(`/signin/watch-history/${userId}`)}
      >
        <GalleryVerticalEnd />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">
          Watch-History
        </p>
      </div>
      <div
        className="flex relative items-center gap-2 p-2 cursor-pointer rounded-xl  transition-transform transform hover:scale-105 hover:bg-slate-300 dark:hover:bg-slate-950"
        onClick={() => navigate("/signin/dashboard")}
      >
        <LayoutDashboardIcon />
        <p className="text-[14px] sm:text-[16px] md:text-[17px] px-4">
          Dashboard
        </p>
      </div>
      <div
        className="flex relative items-center gap-4 py-2 px-3 cursor-pointer rounded-xl transition-transform transform hover:scale-105 group dark:hover:bg-gray-900 hover:bg-slate-200"
        onClick={() => signOut()}
      >
        <UserRoundMinusIcon className="w-6 h-6" />
        <div>
          {signOutLoading ? (
            <div className="flex gap-2 ">
              <Loader className="animate-spin" />
              sign-out
            </div>
          ) : (
            "sign-out"
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
