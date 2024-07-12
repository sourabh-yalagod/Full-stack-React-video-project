import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSignOut } from "@/hooks/SignOut";
import MenuBar from "@/utils/MenuBar";
import { ThemeButton } from "@/utils/ThemeButtom";
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
  const { signOut } = useSignOut();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <LucideMenu className="text-slate-900 dark:text-white" />
      </SheetTrigger>
      <SheetContent className="bg-white bg-opacity-85 max-w-[250px] text-slate-900 sm:max-w-[290px] md:max-w-[320px] lg:max-w-[350px] dark:bg-slate-950 dark:text-slate-300">
        <SheetHeader>
          <SheetTitle className="flex items-center px-6 w-full justify-around text-[15px] sm:text-xl">
            <div
              onClick={() => navigate("/")}
              className="flex gap-1 text-xl cursor-pointer hover:scale-105 transition-all"
            >
              <Home />
              <p>Home</p>
            </div>
            <ThemeButton />
          </SheetTitle>
        </SheetHeader>
        <MenuBar />
      </SheetContent>
    </Sheet>
  );
}
