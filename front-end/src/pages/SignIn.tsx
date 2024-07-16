import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { EyeIcon, EyeOff, Loader2, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "@/Redux/store";
import { SignIn } from "@/Redux/ThunkFunction/SignIn";
import { getUser } from "@/Redux/Slice/UserSlice";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface loginDetail {
  username: string;
  password: string;
}

const SignUp = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const userCredential = useSelector((state: RootState) => state.user);
  const [demoAccount] = useState({ username: "one", password: "one" });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<loginDetail>();

  const navigate = useNavigate();
  const { isLoading, error, success, data } = useSelector(
    (state: RootState) => state.auth
  );

  if (data) {
    dispatch(getUser(data?.data));
    // localStorage.setItem("userId", data.data.id);
    // localStorage.setItem("token", data.data.accessToken);
  }

  const openDemoAccount = () => {
    dispatch(SignIn(demoAccount));
    localStorage.setItem("userId", "66533e85150cfad4fea6e215");
    toast({
      title: "Demo account is successfull.....!",
      description: "Please enjoy the videos . .. . . .. !",
      duration: 1000,
    });
    navigate("/");
  };
  const onSubmit = async (data: loginDetail) => {
    try {
      dispatch(SignIn(data));
      if (success) {
        (() => {
          toast({
            title: "Sign In  successfull.....!",
            description:
              "user have logged with correct username and password Please enjoy the videos . .. . . .. !",
            duration: 1000,
          });
        })();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      if (error) {
        (() => {
          toast({
            title: "Sign-In failed.....!",
            description: error || "Somthing went wrong . . . . . . !",
            duration: 1000,
          });
        })();
      }
    } catch (error) {
      console.log("Erro");
      const err = error as AxiosError;
      console.log(err?.response?.data);

      const errorMessage =
        err.message ||
        "User log-in failed due to some reasons. Please check again.";
      console.log(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-black shadow-[0px_0px_12px_0px_black] dark:text-white border-2 max-w-[470px] mx-5 w-full rounded-xl p-7 bg-white dark:bg-gray-800">
        <div className="flex w-full justify-between mb-10">
          <h1 className="text-2xl font-semibold cursor-pointer animate-pulse">
            Sign-In
          </h1>
          <div
            className="flex gap-2 items-center cursor-pointer"
          >
            <img
              className="size-6 sm:size-9 rounded-full"
              src={
                "https://lh3.googleusercontent.com/rormhrw_yZt2v1OKZBaiFCSt8b8QU02kEKiuilfgnpGkOMQd87xm7b7SyIlGoHsL18M"
              }
            />
            <p className="text-slate-800 text-lg sm:text-xl font-semibold dark:text-white">
              Video-Tube
            </p>
          </div>
        </div>
        <form
          className="space-y-7 w-full relative"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <div className="relative">
            <label
              htmlFor="username"
              className="text-[14px] flex w-full justify-between sm:text-[18px]"
            >
              Username
              <User
                className={`${
                  errors?.username?.message ? "text-red-500" : "text-green-700"
                } hover:scale-105 transition-all`}
              />
            </label>
            <input
              placeholder="username"
              type="text"
              id="username"
              {...register("username", {
                required: "Username is required",
                // pattern: {
                //   value: /^[a-zA-Z0-9_]{3,30}$/,
                //   message: "Username should be 3-30 characters and contain only letters, numbers, and underscores"
                // }
              })}
              className="bg-transparent pl-3 border-b-[2px] mt-2 rounded-xl p-1 outline-none border-blue-700 dark:border-white-500 dark:focus:border-blue-500 w-full"
            />
            {errors.username && (
              <span className="text-red-500 absolute -bottom-7 left-0 text-xs">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="text-[14px] flex w-full justify-between sm:text-[18px]"
            >
              Password:
              <div
                onClick={() => setShowPassword(!showPassword)}
                className={`${
                  errors?.password?.message ? "text-red-500" : "text-green-700"
                } size-5 sm:size-7 hover:scale-105 transition-all`}
              >
                {showPassword ? <EyeIcon /> : <EyeOff />}
              </div>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                // pattern: {
                //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                //   message: "Password must be at least 8 characters long and include uppercase, lowercase, and a number"
                // }
              })}
              className="bg-transparent pl-3 border-b-[2px] mt-2 rounded-xl p-1 outline-none border-blue-700 dark:border-white-500 dark:focus:border-blue-500 w-full"
            />
            {errors.password && (
              <span className="text-red-500 absolute -bottom-7 left-0 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex gap-3 text-[14px] sm:text-[17px]">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 p-1 dark:hover:bg-blue-900 text-white outline-none font-bold rounded w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin inline-block mr-2" /> Please
                  wait....
                </>
              ) : (
                "Sign Up"
              )}
            </button>
            <button
              type="reset"
              onClick={() => reset()}
              className="bg-red-500 hover:bg-red-700 dark:bg-red-700 p-1 dark:hover:bg-red-900 text-white outline-none font-bold rounded w-full"
            >
              Reset
            </button>
            <button
              onClick={() => openDemoAccount()}
              className="bg-green-700 hover:bg-green-900 text-white p-1 outline-none transition-all font-bold rounded w-full"
            >
              Try Demo
            </button>
          </div>
        </form>
        <div className="w-full flex justify-center pt-4 gap-4 text-black dark:text-white">
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-blue-500 dark:text-blue-300 underline"
          >
            Sign-In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
