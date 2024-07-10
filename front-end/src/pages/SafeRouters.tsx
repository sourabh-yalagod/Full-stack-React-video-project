import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getUserId } from "@/Services/Auth";
const SafeRouters = () => {
  const userAuth = useSelector((state: RootState) => state.user);
  // const authTokenFromLocal = localStorage.getItem("token");
  // const decodedToken = jwtDecode(authTokenFromLocal)
  // console.log("decodedToken : ",decodedToken);
  const userId = getUserId().userId
  
  const token = userId || userAuth.token;

  const isLoggedIn = token?.length > 0;

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default SafeRouters;
