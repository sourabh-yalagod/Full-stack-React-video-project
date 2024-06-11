import { DoorClosedIcon , Loader2, Menu, MessageSquareIcon, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";



export function UserProfileData({data}:any) {
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="text-white text-sm md:text-md lg:text-lg">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="text-white w-full">
        <ul className="w-full text-[19px] grid px-3 justify-center grid-cols- place-items-first space-y-4">
          <li className="underline flex gap-2 items-center">Fullname : {data.fullname || <Loader2 className="animate-spin"/>}</li>
          <li className="underline flex gap-2 items-center">UserName : {data.username || <Loader2 className="animate-spin"/>}</li>
          <li className="underline flex gap-2 items-center">Email : {data.email || <Loader2 className="animate-spin"/>}</li>
          <li className="underline flex gap-2 items-center">Total Subscribers : {data.subscribers || <Loader2 className="animate-spin"/>}</li>
          <li className="text-xl flex gap-2 mr-7 text-white"><ThumbsUp/>Total Likes : {data.likes || <Loader2 className="animate-spin"/>}</li>
          <li className="text-xl flex gap-2 mr-7 text-white"><MessageSquareIcon/>Total Comments : {data.comments || <Loader2 className="animate-spin"/>}</li>
        </ul>
        <DrawerFooter className="w-full flex items-center justify-around">
          <DrawerClose asChild>
            <Button className="text-md border-[2px] border-white w-fit bg-red-700 rounded-2xl">
              <DoorClosedIcon className="mr-5" />
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
