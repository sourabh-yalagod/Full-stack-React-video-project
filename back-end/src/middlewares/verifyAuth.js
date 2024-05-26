import { User } from "../models/user.model.js";
import { ApiError } from "../utilities/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyAuth = async (req, res, next) => {
  // console.log(req.cookies);
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // console.log("Decoded Token:", decodedToken); 

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
};
