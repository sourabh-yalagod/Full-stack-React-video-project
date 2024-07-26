
export const sortArray = (videos, sortBy) => {
  return videos.sort((a, b) => {
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
