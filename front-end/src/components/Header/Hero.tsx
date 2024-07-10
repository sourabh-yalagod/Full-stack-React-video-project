import { SideMenuBar } from "@/components/SideBarMenu";
import { ThemeButton } from "@/utils/ThemeButtom";
import { SearchCode } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchBar, setSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full sm:pl-[70px] mx-auto pt-16 flex justify-between items-center py-10 gap-4 text-slate-800 dark:bg-slate-900 dark:text-slate-500 relative">
      <SideMenuBar />
      <div
        onClick={() => navigate("/")}
        className="flex gap-2 items-center justify-around px-8 cursor-pointer"
      >
        <img
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full"
          src={
            "https://lh3.googleusercontent.com/rormhrw_yZt2v1OKZBaiFCSt8b8QU02kEKiuilfgnpGkOMQd87xm7b7SyIlGoHsL18M"
          }
        />
        <p className="text-slate-800 text-2xl font-bold dark:text-white">
          Video-Tube
        </p>
      </div>
      <div className="flex sm:hidden items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-transform transform hover:scale-105 mr-4">
        <ThemeButton />
      </div>
      <div className="hidden sm:block mr-7 min-w-[250px] text-slate-900 flex dark:text-white text-2xl relative">
        <SearchCode
          onClick={() => setSearchBar(!searchBar)}
          className="absolute right-2 top-[50%] -translate-y-[50%] transition-all"
        />
        {searchBar && (
          <input
            type="text"
            className="bg-transparent border-[1px] text-[17px] w-full border-slate-500 rounded-xl px-2 py-1 outline-none"
            placeholder="search video . . . ."
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        )}
      </div>
    </div>
  );
};
export default Hero;
