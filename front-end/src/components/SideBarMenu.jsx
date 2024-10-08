import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import userAuth from "@/Services/Auth";
import MenuBar from "@/utils/MenuBar";
import { ThemeButton } from "@/utils/ThemeButtom";
import { HomeIcon, LucideMenu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SideMenuBar() {
  const { userId } = userAuth();
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <LucideMenu className="text-slate-900 sm:hidden dark:text-white cursor-pointer hover:scale-125 transition-all" />
      </SheetTrigger>
      <SheetContent className="bg-white bg-opacity-85 w-fit text-slate-900 dark:bg-black border-none dark:text-slate-300">
        <SheetHeader>
          <SheetTitle className="flex items-center px-2 py-4 w-full justify-around text-[15px] sm:text-xl">
            <ThemeButton />
            <p>Theme</p>
          </SheetTitle>
        </SheetHeader>
        <MenuBar userId={userId} />
      </SheetContent>
    </Sheet>
  );
}
