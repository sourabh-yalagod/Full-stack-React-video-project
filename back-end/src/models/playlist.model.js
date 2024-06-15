import mongoose from "mongoose";

const playListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    videoId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

export const playList = mongoose.model("playlist", playListSchema);
