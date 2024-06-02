import { Router } from "express";
import { getAllvideos, getVideoBySearch } from "../controllers/dashboard.controller.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";
const router = Router();

router.route("/").get(getAllvideos);
router.route('/search-video').get(getVideoBySearch);
export default router