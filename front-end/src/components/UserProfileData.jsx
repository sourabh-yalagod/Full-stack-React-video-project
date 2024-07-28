import {
  DatabaseZapIcon,
  DoorClosedIcon,
  Loader2,
  MailSearch,
  Menu,
  MessageCircle,
  MessageSquareIcon,
  Notebook,
  ThumbsUp,
  UserCheck,
  UserCircle,
  UserPlus,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function UserProfileData({ data }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <DatabaseZapIcon className="size-9 sm:size-10 sm:m-4 md:m-8 md:size-12 cursor-pointer hover:scale-95 transition-all m-2 text-white bg-black p-2 rounded-lg" />
      </DrawerTrigger>
      <DrawerContent className="w-full bg-gray-100 bg-opacity-90 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DrawerTitle className="py-10 font-semibold text-3xl text-center">
          <span className="font-bold capitalize animate-pulse text-blue-500">
            {data.username}
          </span>
          's Profile Data
        </DrawerTitle>
        <ul className="w-full text-[19px] grid px-3 justify-center space-y-5">
          <li className="underline flex gap-2 items-center text-gray-900 dark:text-gray-100">
            <UserCheck />
            Fullname : {data.fullname || <Loader2 className="animate-spin" />}
          </li>
          <li className="underline flex gap-2 items-center text-gray-900 dark:text-gray-100">
            <UserCircle />
            UserName : {data.username || <Loader2 className="animate-spin" />}
          </li>
          <li className="underline flex gap-2 items-center text-gray-900 dark:text-gray-100">
            <MailSearch />
            Email : {data.email || <Loader2 className="animate-spin" />}
          </li>
          <li className="underline flex gap-2 items-center text-gray-900 dark:text-gray-100">
            <UserRound />
            Total Subscribers :{" "}
            {data.subscribers ?? "0" ?? <Loader2 className="animate-spin" />}
          </li>
          <li className="text-xl flex gap-2 mr-7 text-gray-900 dark:text-gray-100">
            <ThumbsUp />
            Total Likes :{" "}
            {data.likes ?? "0" ?? <Loader2 className="animate-spin" />}
          </li>
          <li className="text-xl flex gap-2 mr-7 text-gray-900 dark:text-gray-100">
            <MessageSquareIcon />
            Total Comments :{" "}
            {data.comments ?? "0" ?? <Loader2 className="animate-spin" />}
          </li>
        </ul>
        <DrawerFooter className="w-full flex items-center justify-around">
          <DrawerClose asChild>
            <button className="flex gap-2 items-center bg-red-500 p-2 text-white rounded-lg cursor-pointer hover:scale-90 transition">
              <DoorClosedIcon className="mr-5" />
              Close
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
