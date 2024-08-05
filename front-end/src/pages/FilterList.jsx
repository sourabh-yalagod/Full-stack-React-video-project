import React from "react";

const FilterList = () => {
  return (
    <select
      onChange={(e) => {
        setSortType(e.target.value);
      }}
      value={sortType}
      className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-800 rounded-md shadow-sm dark:focus:ring-slate-400 transition-colors duration-200 p-1 flex items-center justify-around text-[12px] sm:text-[13px] md:text-[15px]"
    >
      <option value="new">Latest</option>
      <option value="old">Old</option>
      <option value="high-duration">Long Videos</option>
      <option value="low-duration">Short Videos</option>
      <option value="maxViews">Most Viewed</option>
      <option value="minViews">Least Viewed</option>
    </select>
  );
};

export default FilterList;
