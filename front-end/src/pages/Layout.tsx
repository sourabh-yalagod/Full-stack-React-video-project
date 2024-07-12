// Layout.tsx
import { FC } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import store from "@/Redux/store";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import Hero from "@/components/Header/Hero";
import { Toaster } from "@/components/ui/toaster";
import StickySideMenu from "../components/StickySideMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Layout: FC = () => {
  const location = useLocation();
  const hideHeroPathsForHero = [
    "/signin",
    "/signup",
  ];
  const shouldHideHero = hideHeroPathsForHero.some((path) =>
    matchPath(path, location.pathname)
  );
  const client = new QueryClient();
  return (
    <div className="relative">
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <ThemeProvider>
            {!shouldHideHero && <Hero />}
            <StickySideMenu location={location.pathname} />
            <div className="p-0 sm:pl-[60px]">
              <Outlet />
            </div>
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
};

export default Layout;
