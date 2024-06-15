import { AsyncHandler } from "../utilities/AsyncHandler.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { playList } from "../models/playlist.model.js";
import mongoose from "mongoose";

const createPlayList = AsyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { videoId } = req.body || req.params;
  if (!title || !description) {
    throw new ApiError(
      401,
      "Title and description and VideoId are Required . . . . !"
    );
  }
  const newPlaylist = await playList.create({
    userId: req.user._id,
    title,
    description,
  });
  if (!newPlaylist) {
    throw new ApiError(402, "New Play-list creation failed.....!");
  }
  console.log("newPlaylist : ", newPlaylist);

  return res.json(
    new ApiResponse(
      201,
      newPlaylist,
      `${req.user.username} has successfully created the Playlist with Title : ${title}`
    )
  );
});

const addVideoToPlaylist = AsyncHandler(async (req, res) => {
  const { videoId } = req.params || req.body;
  if (!videoId) {
    throw new ApiError(
      401,
      "Video ID not Found for adding into playlist.....!"
    );
  }
  const playlist = await playList.findOne({ userId: req.user._id });
  if (!playlist) {
    throw new ApiError(401, "Play-list not exist please create a new One");
  }
  const addVideoToPlaylist = await playList.findByIdAndUpdate(
    playlist._id,
    {
      $addToSet: { videoId: videoId },
    },
    { new: true }
  );
  if (!addVideoToPlaylist) {
    throw new ApiError(
      401,
      "New video adding to playlist process failed.....!"
    );
  }
  return res.json(
    new ApiResponse(
      201,
      addVideoToPlaylist,
      "New video is added to the playlist"
    )
  );
});

const deleteVideoFromPlaylist = AsyncHandler(async (req, res) => {
  const { videoId } = req.params || req.body;
  if (!videoId) {
    throw new ApiError(
      401,
      "Video ID not Found for adding into playlist.....!"
    );
  }
  const playlist = await playList.findOne({ userId: req.user._id });
  if (!playlist) {
    throw new ApiError(401, "Play-list not exist please create a new One");
  }
  const deleteVideoFromPlaylist = await playList.findByIdAndUpdate(
    playlist._id,
    {
      $pull: { videoId: new mongoose.Types.ObjectId(videoId) },
    },
    { new: true }
  );
  return res.json(
    new ApiResponse(
      201,
      deleteVideoFromPlaylist,
      "video deleted successfully from the video-Playlist...."
    )
  );
  console.log(deleteVideoFromPlaylist);
});
export { createPlayList, addVideoToPlaylist, deleteVideoFromPlaylist };
