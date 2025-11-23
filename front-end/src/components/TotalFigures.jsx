import { HeartPulse, Notebook, User, Video } from "lucide-react";
import StatisticsBox from "./StatisticsBox";
import { memo } from "react";
const TotalFigures = ({ data }) => {
  const time = new Date();

  return (
    <div>
      <div className="flex w-full justify-between px-5 ">
        <h1 className="text-xl font-bold text-slate-800 py-2 dark:text-slate-200 sm:text-2xl md:text-3xl lg:text-4xl">
          Platform Statistics
        </h1>
        <h1 className="text-[17px] font-semibold text-slate-800 py-2 dark:text-slate-200">
          {time.toLocaleDateString()}
        </h1>
      </div>
      <div className="min-w-[310px] min-h-[150px] w-full grid gap-3 border-slate-800 dark:border-slate-200 border rounded-xl text-slate-800 dark:text-slate-200 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StatisticsBox
          heading="Total User"
          icon={
            <User className="group-hover:block hover:scale-95 transition-all" />
          }
          data={data?.usersCount}
        />
        <StatisticsBox
          heading="Total Likes"
          icon={
            <HeartPulse className="hover:scale-95 transition-all" />
          }
          data={data?.likesCount}
        />
        <StatisticsBox
          heading="Total Commnets"
          icon={
            <Notebook className="hover:scale-95 transition-all" />
          }
          data={data?.commentsCount}
        />
        <StatisticsBox
          heading="Total Videos"
          icon={<Video className="hover:scale-95 transition-all" />}
          data={data?.videosCount}
        />
      </div>
    </div>
  );
};

export default memo(TotalFigures);
