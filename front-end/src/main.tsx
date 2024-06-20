import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "./UI-components/Layout.tsx";
import Dashboard from "./UI-components/Dashboard.tsx";
import UploadVideo from "./UI-components/UploadVideo.tsx";
import MyProfile from "./UI-components/MyProfile.tsx";
import SignUp from "./UI-components/SignUp.tsx";
import SignIn from "./UI-components/SignIn.tsx";
import SafeRouters from "./UI-components/SafeRouters.tsx";
import { Provider } from "react-redux";
import store  from "./Redux/store.ts";
import PlayVideo from "./UI-components/PlayVideo.tsx";
import UpdateProfile from "./UI-components/UpdateProfile.tsx";
import AllFavourateVideos from "./UI-components/AllFavourateVideos.tsx";
import WatchHistory from "./UI-components/WatchHistory.tsx";
import WatchLaterVideos from "./UI-components/WatchLater.tsx";
import VideoPlaylist from "./UI-components/Playlist.tsx";
import PlaylistVideos from "./UI-components/PlaylistVideos.tsx";
import Subscription from "./UI-components/Subscription.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Dashboard />} />
      <Route path="/:videoId" element={<PlayVideo />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="/signin" element={<SafeRouters />}>
        <Route path="upload-video" element={<UploadVideo />} />
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
          element={<AllFavourateVideos />}
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
