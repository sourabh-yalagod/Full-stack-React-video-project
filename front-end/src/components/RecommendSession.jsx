import Video from "@/utils/Video";
import { memo } from "react";

const RecommendSession = ({ videos, avatar, username , className }) => {
  return (
    <div className={`${className} border h-auto border-slate-700 rounded-xl px-1 mx-1 w-[350px] hidden lg:mt-2 lg:block flex-end`}>
      <h1 className="underline py-3 text-center text-xl">Recommended Videos</h1>
      <ul className="grid place-items-center w-full gap-2">
        {videos.map((video) => {
          return (
            <div
              key={video._id}
              className="border-slate-700 w-full border p-2 rounded-xl relative max-w-[450px]"
            >
              <Video titleSize={"12px"} fontSize={"11px"} video={video} avatar={avatar} username={username} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(RecommendSession);
