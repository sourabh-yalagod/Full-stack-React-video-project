import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export const getUserId = () => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    return { userId: null };
  }
  const decodeToken = jwtDecode(accessToken);
  return { userId: decodeToken?._id };
};
