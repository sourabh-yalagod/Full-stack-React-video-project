import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import store from "@/Redux/store";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider>
          {/* <ThemeButton /> */}
          {/* <Hero/> */}
          <Outlet />
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default Layout;
