// BackButton.tsx
import { FC } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  
  return (
    <div className="text-slate-900 dark:text-slate-200 size-9 flex gap-2 absolute top-3 right-10 z-10">
      {!location.pathname.match('/play-video')? (
        <>
          <button onClick={() => navigate(-1)} className="">
            <ArrowBigLeft />
          </button>
          <button onClick={() => navigate(+1)} className="">
            <ArrowBigRight />
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default BackButton;
