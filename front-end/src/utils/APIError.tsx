import { EyeOff } from "lucide-react"

const APIError = () => {
  return (
    <div className="h-1/2 pt-16 w-full px-3 bg-slate-900 grid place-items-center">
    <div className="text-3xl flex items-center gap-4 text-center text-slate-700">
      <p>Something went Wrong</p>
      <EyeOff className="text-slate-700 size-12 text-center animate-spin mb-40" />
    </div>
  </div>
  )
}

export default APIError