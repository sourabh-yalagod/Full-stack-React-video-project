export const calclulateVideoTime = (time: any) => {
  const createdAt: any = new Date(time);
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

// export const calclulatevideoDuration = (time: any) => {
//   const videoDurationBySeconds = time;
//   let hours = 0;
//   let minutes = 0
//   let seconds = 0;
//   if (videoDurationBySeconds < 60) {
//     return { hours:0, minutes:0, seconds: videoDurationBySeconds };
//   }
//   const videoDurationByMinutes = videoDurationBySeconds / 60;
//   if (videoDurationByMinutes < 60) {
//     return {
//       hours,
//       minutes: Math.floor(videoDurationByMinutes),
//       seconds: Math.floor(videoDurationBySeconds % 60),
//     };
//   }
//   const videoDurationByHours = videoDurationByMinutes / 60;
//   if (videoDurationByHours < 60) {
//     return {
//       hours: Math.floor(videoDurationByHours),
//       minutes: Math.floor(videoDurationByMinutes % 60),
//       seconds: Math.floor(videoDurationBySeconds%60),
//     };
//   }
// };
