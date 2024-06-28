import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export function SkeletonCard() {
  const [array] = useState(new Array(2).fill(null));
  console.log(array);

  return (
    <>
      {array.map((_, index) => (
        <div 
        key={index}
        className="flex flex-col flex-1 space-y-3 min-w-[320px] max-w-[400px] border-none rounded-xl border-[1px] w-full bg-slate-700 animate-pulse">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </>
  );
}
