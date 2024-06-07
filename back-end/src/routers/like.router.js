import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import { toggleLikeStatus } from "../controllers/like.controller.js";
const router = Router();

router.route('/toggle-like-status/:videoId').post(verifyAuth,toggleLikeStatus)


export default router;