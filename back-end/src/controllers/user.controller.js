import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { AsyncHandler } from "../utilities/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import { Options } from "../utilities/options.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate tokens");
  }
};

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

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newUser,
        `New user created with, UserName : ${newUser.username} & Email : ${newUser.email}`
      )
    );
});

const loginUser = AsyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username || !email) {
    throw new ApiError(401, "Email or Username can't be empty!");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(401, "User does not exist!");
  }

  const checkPassword = await user.isPasswordCorrect(password);

  if (!checkPassword) {
    throw new ApiError(401, "Password does not match!");
  }

  try {
    const { accessToken, refreshToken } = await getToken(user._id);

    const loggedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!loggedUser) {
      throw new ApiError(401, "Login user not found!");
    }

    return res
      .cookie("accessToken", accessToken, Options)
      .cookie("refreshToken", refreshToken, Options)
      .json(
        new ApiResponse(
          200,
          {
            loggedUser,
            accessToken,
            refreshToken,
          },
          "User logged In Successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, "Failed to log in user");
  }
});

const logout = AsyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );
  return res
    .clearCookie("accessToken", Options)
    .clearCookie("refreshToken", Options)
    .json(
      new ApiResponse(
        201,
        {},
        `${user.username} has logged Out at ${Date.now().toLocaleString()}`
      )
    );
});

const getUser = AsyncHandler(async (req, res) => {
  return res.json(
    new ApiResponse(201, req.user, "User fetched successFully....!")
  );
});

const changePassword = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(401, "Password changing process got failed.....!");
    }

    const isPasswordRight = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordRight) {
      throw new ApiError(401, "You have entered wrong password.....!");
    }
    user.password = newPassword;
    await user.save();
    return res.json(
      new ApiResponse(
        204,
        user,
        `${
          user.username || user.email
        } has successFull changed the Old Password....!`
      )
    );
  } catch (error) {
    throw new ApiError(
      501,
      `${
        req.user.username || req.user.email
      } has failed to change the Old Password....!` + error
    );
  }
});

const newRefreshToken = AsyncHandler(async (req, res) => {
  const newRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  try {
    const decodeToken = jwt.verify(
      newRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodeToken._id);

    if (!user) {
      throw new ApiError(
        401,
        "User not Found during refreshToken Generation.....!"
      );
    }
    if (user.refreshToken !== newRefreshToken) {
      throw new ApiError(501, "Input Token and User Token not matched.....!");
    }
    const { accessToken, refreshToken } = await getToken(user._id);

    res
      .cookie("accessToken", accessToken, Options)
      .cookie("refreshToken", refreshToken, Options)
      .json(
        new ApiResponse(
          201,
          { user, accessToken, refreshToken },
          `${user.username} has Generated new Access and Refresh TOKEN Succeessfully......!`
        )
      );
  } catch (error) {
    throw new ApiError(
      501,
      "New Refresh Token generation process failed.....!"
    );
  }
});

const updateAccount = AsyncHandler(async (req, res) => {
  const { fullname, email } = req.body || req.json;

  if (fullname || email) {
    throw new ApiError(
      401,
      "At least one field Fullname OR Email required....."
    );
  }
  const userId = req.user._id;
  const user = await User.findOneAndUpdate(
    userId,
    {
      $set: {
        fullname,
        email,
      },
    },
    { new: true }
  );
  if (!user) {
    throw new ApiError(
      401,
      "User not found while Modifying the User Account....!"
    );
  }
  return res.json(
    new ApiResponse(201, user, `${user.username} has Modified the User Account`)
  );
});

const changeAvatar = AsyncHandler(async (req, res) => {
  const newAvatarFile = req.files?.avatar[0]?.path || req.file.avatar;

  if (!newAvatarFile) {
    throw new ApiError(401, "Avatar is not Recevied as an Input.....!");
  }
  const avatar = await uploadOnCloudinary(newAvatarFile);

  if (!avatar.url) {
    throw new ApiError(401, "Avatar upload failed on Cloudianary.....!");
  }
  const user = await User.findByIdAndUpdate(
    req?.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  );
  if (!user) {
    throw new ApiError(
      401,
      "User not Found while changing the Avatar File.....!"
    );
  }
  return res.json(
    new ApiResponse(
      204,
      user,
      `${user.username} has changed the Avatar file SuccessFully....!`
    )
  );
});

const changeCoverImage = AsyncHandler(async (req, res) => {
  const newCoverImage = req.files.coverImage[0].path || req.file.coverImage;
  if (!newCoverImage) {
    throw new ApiError(401, "New CoverImage has not received from Client");
  }
  const coverImage = await uploadOnCloudinary(newCoverImage);
  if (!coverImage.url) {
    throw new ApiError(
      401,
      "New CoverImage failed while Uploading on Cloudinary"
    );
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  );
  if (!user) {
    throw new ApiError(
      404,
      "user not Found while changing the User Cover-Image"
    );
  }

  return res.json(
    new ApiResponse(
      203,
      user,
      `${user.username} has Changed the Cover Image Succeefully`
    )
  );
});

export {
  RegisterUser,
  loginUser,
  logout,
  getUser,
  changePassword,
  newRefreshToken,
  updateAccount,
  changeAvatar,
  changeCoverImage,
};
