import { AsyncHandler } from "../utilities/AsyncHandler.js";
import { Video } from "../models/video.model.js";

const getAllvideos = AsyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10
  const pages = parseInt(req.query.pages) || 0
  const skip = pages*limit
  const userWithVideos = await Video.aggregate([
    {
      $match: {
        isPublished: true, 
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $unwind: "$owner",
    },
    {
      $project: {
        _id: 1,
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
        owner: 1,
        createdAt: 1,
        isPublished: 1,
        username: "$owner.username",
        fullname: "$owner.fullname",
        avatar: "$owner.avatar",
        coverImage: "$owner.coverImage",
      },
    },
    {
      $skip:skip 
    },
    {
      $limit:limit
    }
  ]);
  console.log(userWithVideos);
  return res.json(userWithVideos);
});

// const getVideoBySearch = AsyncHandler(async (req, res) => {
//   const { search } = req.query;
//   if (!search) {
//     throw new ApiError(400, "Search query parameter (search) is required");
//   }
//   console.log("search : ", search);
//   const searchRex = new RegExp(search, "gi");
//   const searchResult = await Video.aggregate([
//     {
//       $match: {
//         $or: [
//           { title: { $regex: searchRex } },
//           { description: { $regex: searchRex } },
//         ],
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "owner",
//         foreignField: "_id",
//         pipeline: [
//           {
//             $project: {
//               fullname: 1,
//               username: 1,
//               avatar: 1,
//               coverImage: 1,
//             },
//           },
//         ],
//         as: "owner",
//       },
//     },
//     {
//       $unwind: "$owner",
//     },
//     {
//       $project: {
//         _id: 1,
//         videoFile: 1,
//         thumbnail: 1,
//         title: 1,
//         description: 1,
//         duration: 1,
//         views: 1,
//         owner: 1,
//         createdAt: 1,
//         isPublished: 1,
//       },
//     },
//   ]);
//   console.log(getVideoBySearch);
//   return res.json(
//     new ApiResponse(201, searchResult, "search result are fetched....!")
//   );
// });
export { getAllvideos };
