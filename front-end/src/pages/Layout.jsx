// Layout.jsx
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import {store} from "@/Redux/store";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import Hero from "@/components/Header/Hero";
import { Toaster } from "@/components/ui/toaster";
import StickySideMenu from "../components/StickySideMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Layout = () => {
  const location = useLocation();
  const hideHeroPathsForHero = ["/signin", "/signup"];
  const shouldHideHero = hideHeroPathsForHero.some((path) =>
    matchPath(path, location.pathname)
  );
  return (
    <div className="relative dark:bg-black bg-white">
      <Provider store={store}>
        <ThemeProvider>
          {!shouldHideHero && <Hero />}
          <StickySideMenu location={location.pathname} />
          <div className="p-0 sm:pl-[60px]">
            <Outlet />
          </div>
          <Toaster />
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default Layout;
