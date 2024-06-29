// BackButton.tsx
import { FC } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-slate-900 dark:text-slate-200 size-9 flex gap-2 absolute top-3 right-10 z-10">
      <button
        onClick={() => navigate(-1)}
        className=""
      >
        <ArrowBigLeft />
      </button>
      <button
        onClick={() => navigate(+1)}
        className=""
      >
        <ArrowBigRight />
      </button>
    </div>
  );
};

export default BackButton;
