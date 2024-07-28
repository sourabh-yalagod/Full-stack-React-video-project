import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config({ path: './.env' });

// Configure CORS
app.use(
  cors({
    origin: [
      'https://full-stack-frontend-2pfi.onrender.com', // Frontend URL
      'http://localhost:5173', // Local development URL
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Import and use routers for API endpoints
import userRouter from './routers/user.router.js';
import videoRouter from './routers/video.router.js';
import commentRouter from './routers/comment.router.js';
import likeRouter from './routers/like.router.js';
import dashboardRouter from './routers/dashboard.router.js';
import profileRouter from './routers/user-profile.router.js';
import playListRouter from './routers/playlist.route.js';
import homeRouter from './routers/home.router.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/home', homeRouter);
app.use('/api/v1/videos', videoRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/likes', likeRouter);
app.use('/api/v1/user-profiles', profileRouter);
app.use('/api/v1/video-play-list', playListRouter);
app.use('/api/v1/dashboard', dashboardRouter);

// Export the app for use in server initialization
export { app };
