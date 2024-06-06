import {
  DoorClosedIcon,
  Menu,
  Upload,
  User,
  UserCheck2,
  UserCircle,
  UserCogIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearLoggedUser } from "@/Redux/Slice/SignIn";

export function PlatForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="text-white text-sm md:text-md lg:text-lg">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="text-white w-full flex">
        <div className="w-full flex justify-around p-5 flex-wrap gap-9 m-3 mx-auto">
          <div
            className="grid place-items-center cursor-pointer"
            onClick={() => navigate("signin")}
          >
            <UserCheck2 className="" />
            <label>Creat Account</label>
          </div>
          <div
            className="grid place-items-center cursor-pointer"
            onClick={() => navigate("signin/upload-video")}
          >
            <Upload className="" />
            <label>Uplaod Video</label>
          </div>
          <div
            className="grid place-items-center cursor-pointer"
            onClick={() => navigate(`signin/user-profile:id`)}
          >
            <UserCogIcon className="" />
            <label>My Profile</label>
          </div>
          <div
            className="grid place-items-center cursor-pointer"
            onClick={() => {
              localStorage.removeItem("accessToken");
              dispatch(clearLoggedUser());
              navigate("/");
            }}
          >
            <UserCircle className="" />
            <label>Sign-Out</label>
          </div>
        </div>
        <DrawerFooter className="w-full flex items-center justify-around">
          <DrawerClose asChild>
            <Button className="text-md border-[2px] border-white w-fit bg-red-700 rounded-2xl">
              <DoorClosedIcon className="mr-5" />Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
