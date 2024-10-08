// BackButton.jsx
import { FC } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavigateButton= () => {
  const navigate = useNavigate();
  return (
    <div className="text-slate-900 dark:text-slate-200 flex hidden sm:block">
      <div className="items-center gap-2 flex">
        <button
          onClick={() => navigate(-1)}
          className="p-[2px] rounded-full dark:bg-black bg-white hover:scale-95 transition-all hover:-translate-x-1"
        >
          <ArrowBigLeft className="size-7 sm:size-8" />
        </button>
        <button
          onClick={() => navigate(+1)}
          className="p-[2px] rounded-full dark:bg-black bg-white hover:scale-95 transition-all hover:translate-x-1"
        >
          <ArrowBigRight className="size-7 sm:size-8" />
        </button>
      </div>
    </div>
  );
};

export default NavigateButton;
