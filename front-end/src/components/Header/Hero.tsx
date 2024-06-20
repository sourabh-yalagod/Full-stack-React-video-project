import { SideMenuBar } from "@/UI-components/SideBarMenu";
import { ThemeButton } from "@/utils/ThemeButtom";

const Hero = () => {
  return (
    <div className="w-full flex justify-between gap-4 text-slate-800">
      <div className="flex gap-2 items-center justify-around">
        <SideMenuBar />
        <img
          className="w-14 h-14 animate-accordion-down"
          src={
            "./Assets/Logo.png" ??
            "https://w7.pngwing.com/pngs/406/78/png-transparent-android-media-player-video-player-android-blue-angle-video-player.png"
          }
        />
        <p className="text-slate-800 text-3xl font-bold dark:text-white">
          Play Video
        </p>
      </div>
      <div>
        <ThemeButton />
      </div>
    </div>
  );
};

export default Hero;
