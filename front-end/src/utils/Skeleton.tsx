import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export function SkeletonCard() {
  const [array] = useState(new Array(5).fill(null));
  return (
    <div className="flex flex-wrap items-start w-full justify-center pt-10 px-2 gap-3">
      {array.map((_, index) => (
        <div
          key={index}
          className="flex-1 h-52 min-w-[320px] max-w-[350px] rounded-xl relative cursor-wait"
        >
          <Skeleton className="h-40 bg-slate-400 w-full rounded-xl object-cover" />
          <div className="flex w-full justify-around items-center pt-2 px-3">
            <Skeleton className="h-10 w-10 p-2 rounded-full bg-slate-400" />
            <div className="w-full grid gap-2 ml-4">
              <Skeleton className="h-3 bg-slate-400 rounded-xl" />
              <Skeleton className="h-3 bg-slate-400 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
