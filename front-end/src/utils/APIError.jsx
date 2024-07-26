import { EyeOff } from "lucide-react";

const APIError = () => {
  return (
    <div className="absolute inset-0 grid place-items-center w-full px-3 dark:bg-black dark:text-white text-slate-800 min-h-screen -z-20">
      <div className="text-3xl flex justify-center gap-8 text-center">
        <EyeOff className="text-slate-700 size-12 text-center animate-pulse mb-40" />
        <p>Something went Wrong . . . . . !!</p>
      </div>
    </div>
  );
};

export default APIError;
