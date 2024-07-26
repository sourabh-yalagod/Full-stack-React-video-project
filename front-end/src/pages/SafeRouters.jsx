import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import userAuth from "../Services/Auth";
const SafeRouters = () => {
  const getUserId = useSelector((state) => state.user);
  const { userId } = userAuth();
  const isLoggedIn = userId?.length > 0;
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default SafeRouters;
