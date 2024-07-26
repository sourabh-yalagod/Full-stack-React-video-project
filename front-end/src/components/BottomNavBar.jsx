import userAuth from "@/Services/Auth";
import { FileStack, Home, Music, PlusCircle, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const { userId } = userAuth();
  return (
    <div className="fixed p-1 items-center rounded-t-xl text-white z-10 flex gap-3 justify-around bottom-0 w-full sm:hidden bg-black bg-opacity-50">
      <div
        onClick={() => navigate("/")}
        className="grid place-items-center gap-1 text-[9px] hover:scale-110 transition-all cursor-pointer"
      >
        <Home />
        <p>Home</p>
      </div>
      <div className="grid place-items-center gap-1 text-[9px] hover:scale-110 transition-all cursor-pointer ">
        <Music />
        <p>Shorts</p>
      </div>
      <div
        onClick={() => navigate("/signin/upload-video")}
        className="grid place-items-center gap-1 text-[9px] hover:scale-110 transition-all cursor-pointer"
      >
        <PlusCircle className="size-8" />
        <p>Upload</p>
      </div>
      <div
        onClick={() => navigate(`/signin/subscription-status/${userId}`)}
        className="grid place-items-center gap-1 text-[9px] hover:scale-110 transition-all cursor-pointer"
      >
        <FileStack />
        <p>subscription</p>
      </div>
      <div
        onClick={() => navigate(`/signin/user-profile/${userId}`)}
        className="grid place-items-center gap-1 text-[9px] hover:scale-110 transition-all cursor-pointer"
      >
        <UserRound />
        <p>My Profile</p>
      </div>
    </div>
  );
};

export default BottomNavBar;
