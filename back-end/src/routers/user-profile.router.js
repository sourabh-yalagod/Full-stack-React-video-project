import {Router} from "express";
import { getUserInfo } from "../controllers/profile.controller.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";
const router = Router();


router.route('/user-profile/:userId').get(verifyAuth,getUserInfo)

export default router