import { Trash } from "lucide-react"

const VideoNotFound = () => {
  return (
    <div className="h-1/2 w-full grid place-items-center pt-20">
        <div className="flex gap-4 text-slate-500 text-3xl items-center tracking-wider ">
            <Trash className="animate-bounce size-14" />
            <p>No video Found . . . . .</p>
        </div>
    </div>
  )
}

export default VideoNotFound