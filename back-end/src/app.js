import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

dotenv.config({ path: './.env' });

// Configure CORS
app.use(cors({
  origin: [
    'https://full-stack-frontend-2pfi.onrender.com',
    'http://localhost:5173',
    'https://vidsphere-frontend.onrender.com'
  ],
  credentials: true
}));

console.log(path.resolve('../frontend/dist/index.html'));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.resolve('../frontend/dist')));

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

// Serve the frontend app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve('../frontend/dist/index.html'));
});

// Export app
export { app };
