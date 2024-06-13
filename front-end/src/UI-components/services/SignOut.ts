import { clearLoggedUser } from "@/Redux/Slice/SignIn";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const dispatch = useDispatch();
const navigate = useNavigate();
export const signOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("user");
  dispatch(clearLoggedUser());
  navigate("/");
};
