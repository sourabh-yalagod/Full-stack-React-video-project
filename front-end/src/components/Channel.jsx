import { useNavigate } from "react-router-dom";

const Channel = ({
  avatar,
  username,
  fullname,
  channelId,
}) => {
  const navigate = useNavigate();
  // const userId = localStorage.getItem("userId");
  
  return (
    <div
      onClick={() => navigate(`/signin/user-profile/${channelId}`)}
      className="flex gap-5 p-2 px-3 justify-around dark:bg-black mx-2 border-slate-800 dark:border-slate-600 rounded-xl border-[1px]  items-center min-w-[130px]"
    >
      <div>
        <img className="size-11 rounded-full dark:border-white border-[2px] border-black" src={avatar} />
      </div>
      <div className="text-slate-900 grid place-items-center dark:text-white text-[13px]">
        <p className="font-semibold text-[15px]">{fullname}</p>
        <p>@{username}</p>
      </div>
    </div>
  );
};

export default Channel;
