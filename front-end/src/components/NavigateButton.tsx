// BackButton.tsx
import { FC } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigateButton: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="text-slate-900 dark:text-slate-200 size-9 mr-9   flex gap-2 absolute top-3 right-10 z-10">
      {!location.pathname.match('/play-video')? (
        <>
          <button onClick={() => navigate(-1)} className="px-2 py-1 rounded-xl bg-blue-400">
            <ArrowBigLeft />
          </button>
          <button onClick={() => navigate(+1)} className="px-2 py-1 rounded-xl bg-blue-400">
            <ArrowBigRight />
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavigateButton;
