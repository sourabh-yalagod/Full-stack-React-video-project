import React from "react";

const StatisticsBox = ({ heading, data, icon }) => {
  return (
    <div className="grid gap-1 place-items-center border-slate-800 border dark:border-slate-200 transition-all rounded-xl text-slate-800 dark:text-slate-200 p-3 cursor-pointer hover:text-white text-xl font-bold hover:bg-gray-900 group">
      {icon}
      <p>{heading || ""} </p>
      <p>{data || "0"}</p>
    </div>
  );
};

export default StatisticsBox;
