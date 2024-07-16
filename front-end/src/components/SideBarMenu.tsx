import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MenuBar from "@/utils/MenuBar";
import { ThemeButton } from "@/utils/ThemeButtom";
import { HomeIcon, LucideMenu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SideMenuBar() {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <LucideMenu className="text-slate-900 dark:text-white cursor-pointer hover:scale-125 transition-all" />
      </SheetTrigger>
      <SheetContent className="bg-white bg-opacity-85 w-auto text-slate-900 dark:bg-slate-950 dark:text-slate-300">
        <SheetHeader>
          <SheetTitle className="flex items-center px-2 pt-6 w-full justify-around text-[15px] sm:text-xl">
            <div
              onClick={() => navigate("/")}
              className="flex gap-1 text-xl cursor-pointer hover:scale-105 transition-all"
            >
              <HomeIcon />
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
