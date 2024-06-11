import { ApiResponse } from "../utilities/ApiResponse.js";
import { AsyncHandler } from "../utilities/AsyncHandler.js";
import { Like } from "../models/like.model.js";
import mongoose from "mongoose";

const toggleLikeStatus = AsyncHandler(async (req, res) => {
  const {videoId} = req.params;
  const { likeStatus } = req.body;
  const userId = req?.user?._id;
  let like;

  const isLikeExist = await Like.findOne({
    video:videoId,
    owner:userId,
    likeStatus:true
  })
  if(!isLikeExist){
    like = await Like.create({
      likeStatus:true,
      owner: userId,
      video: videoId,
    });
  }
  if (likeStatus) {
    like = await Like.deleteOne({owner:userId,video:videoId}) 
  }
  const countLikes = await Like.aggregate([
    {
      $match:{
        video:new mongoose.Types.ObjectId(videoId)
      }
    },
    {
      $group: {
        _id: null,  
        totalLikes: {
          $sum: {
            $cond: {
              if: { $eq: ["$likeStatus", true] },
              then: 1, 
              else: -1, 
            },
          },
        },
      },
    },
  ]);
  console.log(countLikes);
  return res.json(
    new ApiResponse(201, countLikes, "Liked the video successfully!")
  );
});

export { toggleLikeStatus };
