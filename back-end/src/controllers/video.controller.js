import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { AsyncHandler } from "../utilities/AsyncHandler.js";
import { User } from "../models/user.model.js";


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

const getVideo = AsyncHandler(async (req, res) => {
  console.log(req.params);
  const videoId = req.query.videoId;
  if (!videoId) {
    throw new ApiError(401, "Video ID is not fetched from Request......!");
  }
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(401, "Video not Found......!");
  }
  return res.json(
    new ApiResponse(204, video, `Video Found Owned by ${video.owner}`)
  );
});

const updateVideo = AsyncHandler(async (req, res) => {
  console.log(req);
  const { videoId } = req.query;
  const { title, description } = req.body;
  console.log();
  const thumbnail = req.file.path;

  if (!videoId || !thumbnail || !title || !description) {
    throw new ApiError(404, "All the Field are Required.....!");
  }
  const uploadThumbnail = await uploadOnCloudinary(thumbnail);

  if (!uploadThumbnail.url) {
    throw new ApiError(404, "Thumbnail is not uploaded on Cloudinary.....!");
  }
  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
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
  console.log(user);
  const video = await Video.findById(videoId);
  console.log(video);
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

export {
  publishVideo,
  getVideo,
  updateVideo,
  deleteVideo,
  updateViews,
};
