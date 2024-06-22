import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import store from "@/Redux/store";
import { Outlet } from "react-router-dom";
import Hero from "@/components/Header/Hero";
import { Toaster } from "@/components/ui/toaster";
const Layout = () => {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider>
          <Hero />
          <Outlet />
          <Toaster/>
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default Layout;
