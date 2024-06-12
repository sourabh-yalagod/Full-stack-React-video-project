import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { AsyncHandler } from "../utilities/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import mongoose from "mongoose";

const publishVideo = AsyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const videoFile = req.files.videoFile[0].path;
  const thumbnail = req.files.thumbnail[0].path;

  if (!title || !description || !videoFile || !thumbnail) {
    throw new ApiError(401, "All the files are Required....!");
  }
  const uploadVideo = await uploadOnCloudinary(videoFile);

  const uploadThumbnail = await uploadOnCloudinary(thumbnail);

  if (!uploadVideo.url) {
    throw new ApiError(403, "Video not uploaded on Cloudinary...!");
  }
  if (!uploadThumbnail.url) {
    throw new ApiError(403, "Thumbnail not uploaded on Cloudinary...!");
  }
  const newVideo = await Video.create({
    title,
    description,
    videoFile: uploadVideo.url,
    thumbnail: uploadThumbnail.url,
    duration: uploadVideo.duration,
    views: 0,
    isPublished: true,
    owner: req.user._id,
  });
  if (!newVideo) {
    throw new ApiError(403, "Video Upload Process failed...!");
  }
  return res.json(
    new ApiResponse(201, newVideo, `Video created SuccessFully...`)
  );
});

// const getVideo = AsyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   const { videoId } = req.params;
//   if (!videoId) {
//     throw new ApiError(401, "Video ID is not fetched from Request......!");
//   }
//   const video = await Video.findById(videoId);
//   if (!video) {
//     throw new ApiError(401, "Video not Found......!");
//   }
//   video.views += 1;
//   const videoComments = await Comment.aggregate([
//     {
//       $match: {
//         video: new mongoose.Types.ObjectId(videoId),
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
//               username: 1,
//               createdAt: 1,
//               avatar: 1,
//             },
//           },
//         ],
//         as: "commentOwner",
//       },
//     },
//     {
//       $addFields: {
//         commentOwner: {
//           $first: "$commentOwner",
//         },
//       },
//     },
//     {
//       $project: {
//         content: 1,
//         createdAt: 1,
//         commentOwner: 1,
//       },
//     },
//   ]);

//   const videoLikes = await Like.aggregate([
//     {
//       $match: {
//         video: new mongoose.Types.ObjectId(videoId),
//         likeStatus: true,
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         Likes: {
//           $sum: 1,
//         },
//       },
//     },
//   ]);

//   const Owner = await Video.aggregate([
//     {
//       $match: {
//         _id: new mongoose.Types.ObjectId(videoId),
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "owner",
//         foreignField: "_id",
//         as: "Uploader",
//       },
//     },
//     {
//       $unwind: "$Uploader",
//     },
//   ]);
//   await video.save();

//   const subscription = await User.aggregate([
//     {
//       $match: {
//         _id: new mongoose.Types.ObjectId(new mongoose.Types.ObjectId(userId)),
//       },
//     },
//     {
//       $lookup: {
//         from: "subscriptions",
//         localField: "_id",
//         foreignField: "channel",
//         as: "subscribers",
//       },
//     },
//     {
//       $lookup: {
//         from: "subscriptions",
//         localField: "_id",
//         foreignField: "subscriber",
//         as: "subscribedTo",
//       },
//     },

//     {
//       $addFields: {
//         subscriberCount: {
//           $size: "$subscribers",
//         },
//         chennelSubscribed: {
//           $size: "$subscribedTo",
//         },
//         isSubscribed: {
//           $cond: {
//             if: { $in: [req?.user?._id, "$subscribers.subscriber"] },
//             then: true,
//             else: false,
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         fullname: 1,
//         username: 1,
//         avatar: 1,
//         coverImage: 1,
//         subscriberCount: 1,
//         chennelSubscribed: 1,
//         isSubscribed: 1,
//         email: 1,
//       },
//     },
//   ]);

//   return res.json(
//     new ApiResponse(
//       204,
//       {
//         comments: videoComments,
//         likes: videoLikes[0],
//         video: Owner[0],
//         subscription: subscription[0],
//       },
//       `Video Found Owned by ${video.owner}`
//     )
//   );
// });

const getVideo = AsyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;
  const videoID = new mongoose.Types.ObjectId(videoId);
  const userID = new mongoose.Types.ObjectId(userId);
  await Video.findByIdAndUpdate(
    videoID,
    {
      $inc: { views: 1 },
    },
    { new: true }
  );
  const videoDetail = await Video.aggregate([
    // fetched the video by ID
    {
      $match: {
        _id: videoID,
        isPublished: true,
      },
    },

    // Uploader details using the owner field
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "owner",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribers",
            },
          },
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "subscriber",
              as: "subscribedTo",
            },
          },

          {
            $addFields: {
              subscriberCount: {
                $size: "$subscribers",
              },
              chennelSubscribed: {
                $size: "$subscribedTo",
              },
              isSubscribed: {
                $cond: {
                  if: { $in: [req?.user?._id, "$subscribers.subscriber"] },
                  then: true,
                  else: false,
                },
              },
            },
          },
          {
            $project: {
              fullname: 1,
              username: 1,
              avatar: 1,
              coverImage: 1,
              subscriberCount: 1,
              chennelSubscribed: 1,
              isSubscribed: 1,
              email: 1,
            },
          },
        ],
        as: "Uploader",
      },
    },
    // unwind the Uploader
    {
      $unwind: "$Uploader",
    },
    // Comments for a specific video
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "video",
        pipeline: [
          {
            $project: {
              owner: 1,
              createdAt: 1,
              content: 1,
            },
          },
        ],
        pipeline: [
          {
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "owner",
              as: "CommentOwner",
            },
          },
          {
            $unwind: "$CommentOwner",
          },
          {
            $addFields: {
              username: "$CommentOwner.username",
              avatar: "$CommentOwner.avatar",
            },
          },
          {
            $project: {
              content: 1,
              username: 1,
              avatar: 1,
              createdAt: 1,
            },
          },
        ],
        as: "allComments",
      },
    },
    // total likes of a specific video
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        pipeline: [
          {
            $group: {
              _id: null,
              likes: {
                $sum: 1,
              },
            },
          },
        ],
        as: "totalLikes",
      },
    },
  ]);
  await User.updateOne(
    { _id: req.user._id },
    {
      $addToSet: { watchHistory: videoID }, 
    }
  );
  console.log(videoDetail);
  return res.json(
    new ApiResponse(
      203,
      videoDetail[0],
      "Video and its detail fetched successfully......!"
    )
  );
});
const updateVideo = AsyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;
  const thumbnail = req.file.path;
  if (!videoId || !thumbnail || !title || !description) {
    throw new ApiError(404, "all field should be present.....!");
  }
  const uploadThumbnail = await uploadOnCloudinary(thumbnail);
  console.log(uploadThumbnail.url);
  if (!uploadThumbnail.url) {
    throw new ApiError(404, "Thumbnail is not uploaded on Cloudinary.....!");
  }
  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title: title,
        description: description,
        thumbnail: uploadThumbnail.url,
      },
    },
    { new: true }
  );
  if (!video) {
    throw new ApiError(404, "Video not found for Updating.....!");
  }
  return res.json(
    new ApiResponse(204, video, "video updated Successfully....!")
  );
});

const deleteVideo = AsyncHandler(async (req, res) => {
  const { videoId } = req.query;
  if (!videoId) {
    throw new ApiError(404, "Video ID not fetched for Deleting Video.....");
  }
  const video = await Video.findByIdAndDelete(videoId);
  if (!video) {
    throw new ApiError(404, "Video not deleted.....");
  }
  return res.json(
    new ApiResponse(201, video, "Video deleted successfully.....!")
  );
});

const updateViews = AsyncHandler(async (req, res) => {
  const { videoId } = req.query;
  const userId = req?.user?._id;

  const user = await User.findById(userId);
  const video = await Video.findById(videoId);
  if (!video || !user) {
    throw new ApiError(
      404,
      "Video OR User not Found.....! while views updation"
    );
  }
  video.views = video.views + 1;
  await video.save({ validateBeforeSave: false });
  user.watchHistory.push(videoId);
  await user.save({ validateBeforeSave: false });

  return res.json(
    new ApiResponse(
      202,
      video,
      user,
      `${user.username} has just watched ${video.title} Video......!`
    )
  );
});

export { publishVideo, getVideo, updateVideo, deleteVideo, updateViews };
