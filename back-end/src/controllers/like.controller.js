import { ApiResponse } from "../utilities/ApiResponse.js";
import { AsyncHandler } from "../utilities/AsyncHandler.js";
import { Like } from "../models/like.model.js";

const toggleLikeStatus = AsyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  const { likeStatus } = req.body;
  const userId = req.user._id;
  let like;
  if (likeStatus) {
    like = await Like.create({
      likeStatus,
      owner: userId,
      video: videoId,
    });
  }else{
    await Like.deleteOne({owner:userId,video:videoId})
  }

  const countLikes = await Like.aggregate([
    // {
    //   $match: {
    //     video: new mongoose.Types.ObjectId(videoId),
    //   },
    // },
    {
      $group: {
        _id: "$video",
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

  return res.json(
    new ApiResponse(201, countLikes, "Liked the video successfully!")
  );
});

export { toggleLikeStatus };
