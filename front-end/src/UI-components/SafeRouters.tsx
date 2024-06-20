import { Navigate, Outlet } from "react-router-dom";

const SafeRouters = () => {
  const token: string = localStorage.getItem("accessToken") || "";
  const isLoggedIn =
    token?.length > 0
      ? true
      : false;
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default SafeRouters;
