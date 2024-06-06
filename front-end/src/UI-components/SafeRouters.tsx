import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const SafeRouters = () => {
  console.log("I met with it");

  const signinStates: any = useSelector((state) => state);
  // how to get the isloogin status
  console.log(signinStates.signin.loggedUser);
  const token:string = localStorage.getItem('accessToken') || ''
  const isLoggedIn =
    (signinStates?.signin?.loggedUser?.accessToken?.length > 0 || token?.length > 0) ? true : false;
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default SafeRouters;
