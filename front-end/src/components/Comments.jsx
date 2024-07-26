import { calclulateVideoTime } from "@/Services/CalculateTime";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { MessageCircleHeartIcon } from "lucide-react";
import { useState } from "react";
import CustomizeComment from "./CustomizeComment";
import userAuth from "@/Services/Auth";

const Comments = ({ apiResponse, videoId }) => {
  const [seeMoreComment, SetSeeMoreComment] = useState(false);
  const userId = userAuth().userId;
  return (
    <ScrollArea className="w-full text-white overflow-scroll grid h-56 py-4 md:h-auto lg:h-fit rounded-xl p-1 border-slate-500 border-[1px] lg:min-h-fit">
      <div className="text-slate-700 dark:text-white text-[20px] py-4 flex w-full justify-around items-center gap-5 md:ml-5 space-y-2">
        <h1>Comments : {apiResponse?.allComments?.length || "0"}</h1>
        <h1 className="text-gray-400 dark:text-slate-400 text-sm bg-gray-200 dark:bg-gray-800 p-1 rounded-xl flex gap-1 cursor-default">
          <CustomizeComment videoId={videoId} userId={userId} type="new" />
        </h1>
      </div>
      {!(apiResponse.allComments?.length > 0) ? (
        <div className="flex w-full justify-center gap-2 text-slate-500 dark:text-slate-400 items-center">
          No Comments......
          <MessageCircleHeartIcon />
        </div>
      ) : (
        apiResponse?.allComments.map((e) => (
          <div
            key={e?._id ?? Math.random()}
            className="flex relative w-full text-slate-700 dark:text-slate-300 min-w-[360px] justify-between p-2 border-[1px] border-slate-300 dark:border-slate-700 rounded-xl my-1 items-center"
          >
            <div className="underline w-full justify-between absolute top-0 text-[12px] flex gap-3">
              <p className="absolute right-[3%]">
                {calclulateVideoTime(e?.createdAt)}
              </p>
            </div>
            <div className="grid place-items-center">
              <img
                className="rounded-full w-10 h-10"
                src={
                  e.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
                }
                alt="https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
              />
              <p className="text-[11px] sm:text-[13px] md:text-[14px]">
                {e?.username}
              </p>
            </div>
            <div className="text-slate-500 dark:text-slate-300 ml-5 w-full">
              <p>
                {seeMoreComment
                  ? `${e?.content?.substring(0, 40)}`
                  : `${e?.content}`}
                {e?.content?.length > 40 ? "......." : "."}
              </p>
              <p
                className="text-slate-600 dark:text-slate-400 text-xs cursor-pointer absolute bottom-2 right-2"
                onClick={() => SetSeeMoreComment(!seeMoreComment)}
              >
                {seeMoreComment ? "See less . . . . ." : "See more....."}
              </p>
              <p className="absolute right-[5%] p-1 rounded-full bg-slate-600 text-white hover:scale-110 top-[30%]">
                {userId == e?.owner ? (
                  <CustomizeComment commentId={e?._id} type="edit" />
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        ))
      )}
    </ScrollArea>
  );
};

export default Comments;
