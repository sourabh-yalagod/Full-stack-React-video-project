import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { AsyncHandler } from "../utilities/AsyncHandler.js";

import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";

const RegisterUser = AsyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;

  if (
    [fullname, username, email, password].some((field) => field.trim() == "")
  ) {
    throw new ApiError(401, "all the fields are Required.....!");
  }

  const userExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExist) {
    throw new ApiError(
      401,
      `${(username || email).toUpperCase()} - named User already Exist.....`
    );
  }

  const avatarFile = req.files?.avatar[0]?.path;
  let coverImageFile = req.files?.coverImage[0]?.path;

  if (!avatarFile && !(avatarFile.length > 0)) {
    throw new ApiError(401, "avarat image is not uploaded properly....!");
  }

  const avatar = await uploadOnCloudinary(avatarFile);
  if (coverImageFile && coverImageFile.length > 0) {
    coverImageFile = await uploadOnCloudinary(coverImageFile);
  }
  if (!avatar.url) {
    throw new ApiError(401, "Avatar image is not on Cloudinary.....!");
  }

  const user = await User.create({
    fullname,
    username,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImageFile.url,
  });

  const newUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!newUser) {
    throw new ApiError(500, "new User not created");
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newUser,
        `New user created with, UserName : ${newUser.username} & Email : ${newUser.email}`
      )
    );
});

export { RegisterUser };
