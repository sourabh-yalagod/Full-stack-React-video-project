import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";

const Description = ({ apiResponse }: any) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  return (
    <ScrollArea className="relative px-2 my-1 max-h-[300px] lg:h-auto w-full rounded-xl border-slate-500 border-[1px]">
      <p className="absolute top-0 left-3 text-slate-600 dark:text-slate-400 text-[13px] pb-4">
        Description
      </p>
      <button
        className=" absolute bottom-0 right-3 text-[12px] text-slate-600 dark:text-slate-400"
        onClick={() => setShowFullDescription(!showFullDescription)}
      >
        Show {showFullDescription ? "less......" : "more......"}
      </button>
      <p className="pt-5 pb-2 text-slate-500 dark:text-slate-300">
        {showFullDescription
          ? `${apiResponse?.description}`
          : `${apiResponse?.description?.substring(0, 150)}......`}
      </p>
    </ScrollArea>
  );
};

export default Description;
