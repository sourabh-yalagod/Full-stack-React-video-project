import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { AsyncHandler } from "../utilities/AsyncHandler.js";
import { Like } from "../models/like.model.js";
import { Subscription } from "../models/subscription.model.js";

const getUserInfo = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  if (!userId) {
    throw new ApiError(401, "Params not Found...!");
  }
  const profileContent = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "owner",
        pipeline: [
          {
            $project: {
              fullname: 1,
              username: 1,
              avatar: 1,
              coverImage: 1,
              email: 1,
            },
          },
        ],
        as: "Owner",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        thumbnail: 1,
        videoFile: 1,
        Owner: 1,
      },
    },
    {
      $unwind: "$Owner",
    },
  ]);
  const Likes = await Like.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: null,
        TotalLikes: {
          $sum: 1,
        },
      },
    },
    {
      $unwind: "$TotalLikes",
    },
  ]);
  const Comments = await Comment.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: null,
        TotalComments: {
          $sum: 1,
        },
      },
    },
    {
      $unwind: "$TotalComments",
    },
  ]);
  const Subscriptions = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
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
  ]);

  return res.json(
    new ApiResponse(
      201,
      { profileContent, Likes, Comments ,Subscriptions},
      "Fetched successfully"
    )
  );
});

export { getUserInfo };
