import Video from "@/utils/Video";
import { memo } from "react";

const RecommendSession = ({ videos, avatar, username , className }: any) => {
  console.log({ videos, avatar, username });

  return (
    <div className={`${className} border h-auto border-slate-700 rounded-xl p-2 w-[380px] hidden lg:mt-20 lg:block flex-end`}>
      <h1 className="underline py-3 text-center text-xl">Recommended Videos</h1>
      <ul className="grid place-items-center w-full gap-2">
        {videos.map((video: any) => {
          return (
            <div
              key={video._id}
              className="flex-1 min-w-[320px] max-w-[450px] border-slate-700 border p-2 rounded-xl relative"
            >
              <Video video={video} avatar={avatar} username={username} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(RecommendSession);
