import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import { deleteVideo, getVideo, publishVideo, updateVideo, updateViews } from "../controllers/video.controller.js";
const router = Router();

router.route("/upload-video").post(verifyAuth,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "videoFile", maxCount: 1 },
  ]),
  publishVideo
);


router.route('/get-video').get(verifyAuth,getVideo);
router.route('/update-video').patch(verifyAuth,upload.single('thumbnail'),updateVideo)
router.route('/delete-video').delete(verifyAuth,deleteVideo);
router.route('/update-views').patch(verifyAuth,updateViews);

export default router;