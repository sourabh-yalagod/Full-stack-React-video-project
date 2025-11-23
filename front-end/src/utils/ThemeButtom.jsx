import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
// import { useState } from "react";

export function ThemeButton() {
  const { setTheme } = useTheme();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-5 w-5 rounded-full z-50 outline-none">
          <Sun className="text-white active:rotate-180 transition-all hidden dark:block" />
          <Moon className="dark:scale-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:text-white bg-opacity-95 transition-all bg-white text-black dark:bg-black rounded-xl ml-12">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
