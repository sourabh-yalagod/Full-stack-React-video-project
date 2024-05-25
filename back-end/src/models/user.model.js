import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required......!"],
      unique: [true, "username should be Unique......!"],
      trim: true,
    },
    fullname: {
      type: String,
      required: [true, "fullname is required....!"],
    },
    email: {
      type: String,
      required: [true, "email is required......!"],
    },
    password: {
      type: String,
      required: [true, "password is required......!"],
    },
    refreshToken: {
      type: String,
    },
    avatar: {
      type: String,
      required: [true, "avatar is required....!"],
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullname: this.fullname,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiersIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("users", userSchema);
