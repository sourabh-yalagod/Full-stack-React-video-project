import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { AsyncHandler } from "../utilities/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import mongoose from "mongoose";

const getAllComments = AsyncHandler(async (req, res) => {
  const videoId = req.params.videoId || req.params.videoId;
  if (!videoId) {
    throw new ApiError(401, "Video ID not Found for comments display.....");
  }
  const comments = await Comment.findOne({ video: videoId });
  if (!comments) {
    throw new ApiError(403, "Comments are not fetched.....!");
  }
  return res.json(
    new ApiResponse(201, comments, "Comments are fetched successfully....")
  );
});

const addCommnet = AsyncHandler(async (req, res) => {
  const { content, userId } = req.body;
  const owner = req.user._id;
  const { videoId } = req.params;

  if (!content?.length) {
    throw new ApiError(404, "comment content is not fetched.....!");
  }
  if (!videoId || !userId || !owner) {
    throw new ApiError(
      404,
      "Both video and User is required for comment creation.....!"
    );
  }
  const user = await User.findOne(owner);

  if (!user) {
    throw new ApiError(404, "User not found for comment creation.....!");
  }
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found for comment creation.....!");
  }
  const comment = await Comment.create({
    content,
    userId: userId,
    owner: owner,
    username: user.username,
    video,
  });
  if (!comment) {
    throw new ApiError(404, "Comment is not created.....!");
  }
  console.log(comment);
  const countComment = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $group: {
        _id: "$videoId",
        totalComment: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
  ]);
  return res.json(
    new ApiResponse(
      201,
      comment,
      countComment.totalComment,
      `Comment created successfully by ${user.username} in ${video.title}`
    )
  );
});

const editComments = AsyncHandler(async (req, res) => {
  const { newComment } = req.body;
  const userId = req.user._id;
  const videoId = req.params.videoId;
  console.log(videoId);
  console.log(userId);
  if (!videoId || !userId) {
    throw new ApiError(
      404,
      "Both video and User is required for comment creation.....!"
    );
  }
  const comment = await Comment.findOne({ video: videoId, owner: userId });
  console.log(comment);
  if (!comment) {
    throw new ApiError(404, "Comment editing process failed.....!");
  }
  comment.content = newComment;
  await comment.save();
  return res.json(
    new ApiResponse(203, comment.content, `Comment updated successfully....`)
  );
});

const deleteComment = AsyncHandler(async (req, res) => {
  const videoId = req.params.videoId || req.query.videoId;
  const userId = req.user._id;

  if (!videoId || !userId) {
    throw new ApiError(
      401,
      "Both the user and Video ID are required for Comment Deletion."
    );
  }

  const comment = await Comment.findOne({ video: videoId, owner: userId });

  if (!comment) {
    throw new ApiError(
      404,
      "Comment not found or you are not authorized to delete it."
    );
  }
  const deleteedComment = await Comment.findByIdAndDelete(comment._id);

  return res.json(
    new ApiResponse(200, deleteedComment, "Comment deleted successfully.")
  );
});

export { addCommnet, editComments, deleteComment, getAllComments };
