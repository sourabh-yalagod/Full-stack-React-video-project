import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const userAuth = () => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    return {
      userId: null,
      token: accessToken,
      message: "AccessToken not Found in Cookies",
    };
  }
  const decodedToken = jwtDecode(accessToken);
  const exepiryTime = decodedToken.exp;
  const isexpired = exepiryTime * 1000 - Date.now() < 0;
  if (!isexpired) {
    return {
      userId: decodedToken?._id,
      token: accessToken,
      message: "Token is valid and User is Authenticated",
    };
  }
  return {
    token: accessToken,
    message:
      "Token has Expired please sign-in regenerate new Token for authentication",
  };
};
export default userAuth;
