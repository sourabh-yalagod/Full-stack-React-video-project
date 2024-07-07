import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode} from "jwt-decode"
const SafeRouters = () => {
  const userAuth = useSelector((state: RootState) => state.user);

  const authTokenFromLocal = localStorage.getItem("token");
  const decodedToken = jwtDecode(authTokenFromLocal)
  console.log("decodedToken : ",decodedToken);
  
  const token = authTokenFromLocal || userAuth.token;

  const isLoggedIn = token?.length > 0;

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default SafeRouters;
