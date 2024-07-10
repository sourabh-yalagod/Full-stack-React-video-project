import StatisticsBox from "./StatisticsBox";
import { memo } from "react";
const Performance = ({ data }: any) => {
  return (
    <div className="w-full mx-auto px-3">
      <div className="flex w-full justify-between px-5">
        <h1 className="text-xl font-bold text-slate-800 py-2 dark:text-slate-200 sm:text-2xl md:text-3xl lg:text-4xl">
          {data?.heading}
        </h1>

      </div>
      <div className="min-w-[310px] w-full grid gap-3 border-slate-800 dark:border-slate-200 border rounded-xl text-slate-800 dark:text-slate-200 p-3 sm:grid-cols-2 md:grid-cols-3">
        <StatisticsBox
          heading={data?.views.text}
          icon={data?.views.icon}
          data={data?.views.data}
        />
        <StatisticsBox
          heading={data?.comments.text}
          icon={data?.comments.icon}
          data={data?.comments.data}
        />
        <StatisticsBox
          heading={data?.likes?.text}
          icon={data?.likes?.icon}
          data={data?.likes?.data}
        />
      </div>
    </div>
  );
};

export default memo(Performance);
