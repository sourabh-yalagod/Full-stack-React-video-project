import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "./pages/Layout.tsx";
import UploadVideo from "./pages/UploadVideo.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import SafeRouters from "./pages/SafeRouters.tsx";
import { Provider } from "react-redux";
import store  from "./Redux/store.ts";
import PlayVideo from "./pages/PlayVideo.tsx";
import UpdateProfile from "./components/UpdateProfile.tsx";
import LikedVideos from "./pages/LikedVideos.tsx";
import WatchHistory from "./pages/WatchHistory.tsx";
import WatchLaterVideos from "./pages/WatchLater.tsx";
import VideoPlaylist from "./pages/Playlist.tsx";
import PlaylistVideos from "./pages/PlaylistVideos.tsx";
import Subscription from "./pages/Subscription.tsx";
import Home from "./pages/Home.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/play-video/:videoId" element={<PlayVideo />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="/signin" element={<SafeRouters />}>
        <Route path="upload-video" element={<UploadVideo />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user-profile/:userId" element={<MyProfile />} />
        <Route path="video-play-lists/:userId" element={<VideoPlaylist />} />
        <Route path="playlist-videos/:playlistId" element={<PlaylistVideos />} />
        <Route path="subscription-status/:userId" element={<Subscription />} />
        <Route
          path="settings/customize-profile/:userId"
          element={<UpdateProfile />}
        />
        <Route
          path="all-favourate-videos/:userId"
          element={<LikedVideos />}
        />
        <Route path="watch-history/:userId" element={<WatchHistory />} />
        <Route
          path="watch-later-videos/:userId"
          element={<WatchLaterVideos />}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
