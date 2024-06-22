// import { Moon, Sun } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ThemeButton() {
  const { setTheme } = useTheme();
  const [changeTheme,setChangeTheme] = useState(false)
  setTheme(changeTheme ? 'dark' : 'light')
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline" className="border-white rounded-full z-10">
    //       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 rounded-full scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    //       <Moon className="absolute h-[1.2rem] w-[1.2rem] dark:text-white rounded-full dark:border-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    //       <span className="sr-only">Toggle theme</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="text-white bg-opacity-95 transition-all bg-slate-900 dark:border-white rounded-xl border-slate">
    //     <DropdownMenuItem onClick={() => setTheme("light")}>
    //       Light
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("dark")}>
    //       Dark
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("system")}>
    //       System
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <button onClick={()=>setChangeTheme(!changeTheme)}>{changeTheme ? <Sun className="text-white active:rotate-180 transition-all delay-[2s]"/> : <Moon className="text-slate-900 active:rotate-[360deg] transition-all delay-[2s]"/>} </button>
  );
}
