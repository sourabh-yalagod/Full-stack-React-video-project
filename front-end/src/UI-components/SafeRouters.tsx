import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const SafeRouters = () => {
  const userAuth = useSelector((state: RootState) => state.user);

  const authTokenFromLocal = localStorage.getItem("token");

  const token = authTokenFromLocal || userAuth.token;

  const isLoggedIn = token?.length > 0;

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default SafeRouters;
