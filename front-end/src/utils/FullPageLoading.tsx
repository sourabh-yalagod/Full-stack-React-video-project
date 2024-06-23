import { Loader2 } from "lucide-react"

const FullPageLoading = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center">
        <div className="flex gap-4 text-slate-600 text-3xl items-center tracking-wider ">
            <p>Loading . . . .</p>
            <Loader2 className="animate-spin size-14" />
        </div>
    </div>
  )
}

export default FullPageLoading