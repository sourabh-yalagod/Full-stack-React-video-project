import { SideMenuBar } from "@/UI-components/SideBarMenu";
import { ThemeButton } from "@/utils/ThemeButtom";

const Hero = () => {
  return (
    <div className="w-full flex justify-between items-center p-7 pt-12 gap-4 text-slate-800 dark:bg-slate-900 dark:text-slate-500 relative">
      <SideMenuBar />
      <div className="flex gap-2 items-center justify-around ml-5">
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
      <div>
        <ThemeButton />
      </div>
    </div>
  );
};

export default Hero;
