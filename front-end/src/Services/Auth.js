import { jwtDecode } from "jwt-decode";

const userAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      userId: null,
      token: token,
      message: "token not Found in Cookies",
    };
  }
  const decodedToken = jwtDecode(token);
  const exepiryTime = decodedToken?.exp;
  const isexpired = exepiryTime * 1000 - Date.now() < 0;
  if (!isexpired) {
    return {
      userId: decodedToken?._id,
      token: token,
      message: "Token is valid and User is Authenticated",
    };
  }
  return {
    token: token,
    message:
      "Token has Expired please sign-in regenerate new Token for authentication",
  };
};
export default userAuth;
