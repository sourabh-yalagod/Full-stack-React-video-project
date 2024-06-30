import { useNavigate } from "react-router-dom";

const Channel = ({
    subscribers=0,
    avatar,
    username,
    fullname,
    channelId
    // issubscribed=false
}:any) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  return (
    <div
      onClick={() => navigate(`/signin/user-profile/${channelId}`)}
      className="flex justify-around dark:bg-slate-800 mx-2 border-slate-800 dark:border-slate-600 rounded-xl border-[1px] min-w-[250px]  max-w-md items-center p-1"
    >
      <div>
        <img
          className="size-16 rounded-full"
          src={avatar}
        />
      </div>
      <div className="text-slate-900 grid place-items-center dark:text-white text-[13px]">
        <p className="font-semibold text-[15px]">{fullname}</p>
        <p>@{username}</p>
        <p>{subscribers}</p>
        <button className="px-2 py-1 bg-red-600 text-white rounded-xl mt-1">    
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Channel;
