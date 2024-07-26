export const calclulateVideoTime = (time) => {
  const createdAt = new Date(time);
  const timeDifference = Date.now() - createdAt;
  if (timeDifference > 86400000)
    return Math.floor(timeDifference / 86400000) + " days ago";
  if (timeDifference > 3600000)
    return Math.floor(timeDifference / 3600000) + " hours ago";
  if (timeDifference > 60000)
    return Math.floor(timeDifference / 60000) + " mins ago";
  if (timeDifference > 1000)
    return Math.floor(timeDifference / 1000) + " seconds ago";
};

