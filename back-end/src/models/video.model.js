import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required for every Video.....!"],
    },
    description: {
      type: String,
      required: [true, "description is Required for every Video.....!"],
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    duration:{
        type:Number,
        default:0
    },
    
  },
  { timestamps: true }
);
