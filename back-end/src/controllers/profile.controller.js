import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { AsyncHandler } from "../utilities/AsyncHandler.js";

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
        thumbnail:1,
        videoFile:1,
        Owner: 1,
      },
    },
    {
      $unwind: "$Owner",
    },
  ]);
  return res.json(profileContent);
});
export { getUserInfo };
