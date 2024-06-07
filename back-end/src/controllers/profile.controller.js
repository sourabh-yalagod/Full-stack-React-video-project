import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { AsyncHandler } from "../utilities/AsyncHandler.js";
import { Like } from "../models/like.model.js";

const getUserInfo = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
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
        owner: new mongoose.Types.ObjectId(userId),
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
      $unwind:'$TotalLikes'
    }
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
      $unwind:'$TotalComments'
    }
  ]);
  return res.json(new ApiResponse(
    201,{profileContent,Likes,Comments},'Fetched successfully'
  ));
});

export { getUserInfo };
