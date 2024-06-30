// Layout.tsx
import { FC } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import store from "@/Redux/store";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import Hero from "@/components/Header/Hero";
import { Toaster } from "@/components/ui/toaster";
import BackButton from "@/components/BackButton";
import StickySideMenu from "./StickySideMenu";

const Layout: FC = () => {
  const location = useLocation();
  const hideHeroPathsForHero = [
    "/signin",
    "/signin/upload-video",
    "/signup",
    "/play-video/:videoId",
    "/signin/user-profile/:userId",
  ];
  const shouldHideHero = hideHeroPathsForHero.some((path) =>
    matchPath(path, location.pathname)
  );

  return (
    <div className=" relative">
      <Provider store={store}>
        <ThemeProvider>
          {!shouldHideHero && <Hero />}
          <StickySideMenu location={location.pathname} />
          <BackButton />
          <div className="sm:pl-[70px]">
            <Outlet />
          </div>
          <Toaster />
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default Layout;
