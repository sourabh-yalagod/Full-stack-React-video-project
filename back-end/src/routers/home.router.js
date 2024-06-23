import { Router } from "express";
import { getAllvideos } from "../controllers/home.js";
const router = Router()

router.route('/',).get(getAllvideos)
export default router;