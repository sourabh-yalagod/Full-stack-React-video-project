import { Router } from "express";
import { addCommnet, deleteComment, editComments } from "../controllers/comment.controller.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";
const router = Router();

router.route('/add-comment/:videoId').post(verifyAuth,addCommnet);
router.route('/c/:videoId').patch(verifyAuth,editComments);
router.route('/c/:videoId').delete(verifyAuth,deleteComment);
export default router;