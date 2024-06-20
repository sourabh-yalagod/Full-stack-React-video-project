import { ThemeProvider } from "@/components/theme-provider";
import SignUp from "./SignUp";
import { ThemeButton } from "@/utils/ThemeButtom";
import { Provider } from "react-redux";
import store  from "@/Redux/store";
import SignIn from "./SignIn";
const Layout = () => {
  return (
    <div>
      <ThemeProvider>
        <ThemeButton />
        <Provider store={store}>
          {/* <Outlet /> */}
          <SignIn />
        </Provider>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
