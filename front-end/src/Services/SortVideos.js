export const sortVideos = (videos, type) => {
  let filteredArray;
  switch (type) {
    case "maxViews":
      filteredArray = videos.sort((a, b) => a.views - b.views);
      break;
    case "minViews":
      filteredArray = videos.sort((a, b) => b.views - a.views);
      break;
    case "high-duration":
      filteredArray = videos.sort((a, b) => a.duration - b.duration);
      break;
    case "low-duration":
      filteredArray = videos.sort((a, b) => b.duration - a.duration);
      break;
    case "new":
      filteredArray = videos.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;
    case "old":
      filteredArray = videos.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    default:
      filteredArray = videos; // Default to returning the original array if type is unknown
      break;
  }
  return filteredArray;
};
