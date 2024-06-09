import { Router } from "express";
const router = Router();
import {
  RegisterUser,
  changeAvatar,
  changeCoverImage,
  changePassword,
  getUser,
  getUserProfile,
  handleSubscribers,
  loginUser,
  logout,
  newRefreshToken,
  updateAccount,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  RegisterUser
);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyAuth, logout);
router.route("/change-password").patch(verifyAuth, changePassword);
router.route("/generate-newtokens").get(verifyAuth, newRefreshToken);
router.route("/get-user").get(verifyAuth, getUser);
router.route("/update-account").patch(verifyAuth, updateAccount);
router.route("/change-avatar").patch(verifyAuth ,upload.single('avatar'), changeAvatar);
router.route("/change-coverimage").patch(verifyAuth,upload.single('coverImage'), changeCoverImage);
router.route("/get-user-detail/:userId").get(verifyAuth,getUserProfile);
router.route("/handle-subscribers").post(verifyAuth,handleSubscribers);

export default router;
