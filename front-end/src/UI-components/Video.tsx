
type VideoType = {
  link: string;
  title: string;
  avatar: string;
  thumbnail: string;
};

const Video = ({ thumbnail, link, title, avatar }: VideoType) => {
  return (
    <div className="relative bg-[#212121] min-w-[290px] sm:min-w-1/2 sm:min-w-1/3 p-2 gap-2 rounded-2xl md:min-w-[250px] md:w-full  overflow-hidden">
      <div 
      className="relative">
        <video
          className="w-full object-cover object-center"
          poster={thumbnail}
          controls
          src={link}
          onPlay={(e)=>console.log(e)
          }
        />
      </div>
      <div className="flex items-center gap-1 w-full overflow-scroll mt-2">
        <img
          src={avatar}
          className="w-9 h-9 rounded-full border-2 border-white"
          alt="Avatar"
        />
        <p className="text-white text-[16px] ml-2 overflow-hidden">{title.slice(0,32)}</p>
      </div>
    </div>
  );
};

export default Video;
