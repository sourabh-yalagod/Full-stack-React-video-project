import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "./.env" });
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routers/user.router.js";
import videoRouter from "./routers/video.router.js";
import commentRouter from "./routers/comment.router.js";
import likeRouter from "./routers/like.router.js";
import dashboardRouter from "./routers/dashboard.router.js"
import profileRouter from "./routers/user-profile.router.js"


app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/user-profiles",profileRouter);

export { app };
