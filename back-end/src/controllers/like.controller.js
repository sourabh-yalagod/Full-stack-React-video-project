import { ApiResponse } from "../utilities/ApiResponse.js";
import { AsyncHandler } from "../utilities/AsyncHandler.js";
import { Like } from "../models/like.model.js";
import mongoose from "mongoose";
import { ApiError } from "../utilities/ApiError.js";

const toggleLikeStatus = AsyncHandler(async (req, res) => {
  const { userId } = req.body;
  const {videoId} = req.params;
  const owner = req.user._id;
  if(!userId || !videoId || !owner){
    throw new ApiError(401,'All the Ids are required.....!');
  }
  const checkLike = await Like.findOne({
    owner:owner,
    video:videoId
  })
  console.log("checkLike : ",checkLike);
  if(checkLike){
    const disLike = await Like.deleteOne({
      owner:owner,
      video:videoId
    });
    console.log("Like Removed : ",disLike);
    return res.json(
      new ApiResponse(
        201,disLike,'Like removed....!'
      )
    )
  }
  const like = await Like.create({
    likeStatus:true,
    userId:userId,
    video:videoId,
    owner:owner
  })
  console.log("Like Created : ",like);

  return res.json(
    new ApiResponse(
      201,like,'new Like created....!'
    )
  )
});

export { toggleLikeStatus };
