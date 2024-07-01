export type Video = {
  title: string;
  duration: number;
  old: string;
  new: string;
  views: number;
  createdAt: string;
};

export const sortArray = (videos: Video[], sortBy: string): Video[] => {
  return videos.sort((a: Video, b: Video) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "duration":
        return (a.duration - b.duration);
      case "new":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        case "views":
        return (Number(b.views) - Number(a.views));
      case "old":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });
};
