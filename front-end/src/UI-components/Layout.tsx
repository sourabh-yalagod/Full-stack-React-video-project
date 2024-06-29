// Layout.tsx
import { FC } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import store from "@/Redux/store";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import Hero from "@/components/Header/Hero";
import { Toaster } from "@/components/ui/toaster";
import BackButton from '@/components/BackButton';

const Layout: FC = () => {
  const location = useLocation();
  const hideHeroPaths = ["/signin", "/signin/upload-video","/signup", "/:videoId", "/signin/user-profile/:userId"];
  
  const shouldHideHero = hideHeroPaths.some(path =>
    matchPath(path, location.pathname)
  );

  return (
    <div>
      <Provider store={store}>
        <ThemeProvider>
          {!shouldHideHero && <Hero />}
          <BackButton />
          <Outlet />
          <Toaster />
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default Layout;
