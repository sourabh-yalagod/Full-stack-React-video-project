import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import { addVideoToPlaylist, createPlayList, deleteVideoFromPlaylist } from "../controllers/playList..controller.js";
const router = Router()

router.route('/create-playlist').post(verifyAuth,createPlayList)
router.route('/new-video/:videoId').patch(verifyAuth,addVideoToPlaylist)
router.route('/delete-video/:videoId').delete(verifyAuth,deleteVideoFromPlaylist)

export default router
