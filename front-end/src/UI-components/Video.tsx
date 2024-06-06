
type VideoType = {
  link: string;
  title: string;
  avatar: string;
  thumbnail: string;
};

const Video = ({ thumbnail, link, title, avatar }: VideoType) => {
  return (
    <div className="relative bg-[#212121]  min-w-[290px] sm:min-w-1/2 sm:min-w-1/3 p-1 gap-1 rounded-2xl md:min-w-[250px] md:w-full  overflow-hidden">
      <div onClick={() => console.log("Play")} className="relative">
        <video
          className="w-full"
          poster={thumbnail}
          controls
          src={link}
        />
      </div>
      <div className="flex items-center gap-1 w-full overflow-scroll mt-2">
        <img
          src={avatar}
          className="w-9 h-9 rounded-full border-2 border-white"
          alt="Avatar"
        />
        <p className="text-white text-[17px] ml-2">{title}</p>
      </div>
    </div>
  );
};

export default Video;
