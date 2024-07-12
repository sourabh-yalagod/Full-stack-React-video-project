// BackButton.tsx
import { FC } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavigateButton: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="text-white dark:text-slate-200 flex">
      <div className="items-center gap-2 flex">
        <button
          onClick={() => navigate(-1)}
          className="p-[2px] rounded-full bg-slate-700 hover:scale-95 transition-all hover:-translate-x-2"
        >
          <ArrowBigLeft className="size-7 sm:size-8" />
        </button>
        <button
          onClick={() => navigate(+1)}
          className="p-[2px] rounded-full bg-slate-700 hover:scale-95 transition-all hover:translate-x-2"
        >
          <ArrowBigRight className="size-7 sm:size-8" />
        </button>
      </div>
    </div>
  );
};

export default NavigateButton;
