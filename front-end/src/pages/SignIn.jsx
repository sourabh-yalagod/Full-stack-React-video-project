// src/pages/Signin.js
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, EyeOff, Loader2, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import signIn from "@/Redux/ThunkFunction/SignIn";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/Redux/Slice/UserSlice";

const Signin = () => {
  const queryClient = useQueryClient();
  const time = new Date();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [demoAccount] = useState({ username: "one", password: "one" });
  const dispatch = useDispatch();
  const {
    user: signInResponse,
    isPending: signInLoading,
    error: signInError,
  } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setSubmitted(true);
    dispatch(signIn(data));
  };
  useEffect(() => {
    if (signInResponse?.success && submitted && !signInLoading) {
      toast({
        title: signInResponse?.message,
        description: `At ${time.toLocaleTimeString()}`,
        variant: "default",
        duration: 1000,
      });
      dispatch(getUser(signInResponse?.data));

      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      navigate("/");
      reset();
    }
    if (!signInResponse?.success && submitted && !signInLoading) {
      toast({
        title: "something went wrong try with proper Credentials",
        description: `At ${time.toLocaleTimeString()}`,
        variant: "destructive",
        duration: 1000,
      });
    }
  }, [signInLoading]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
      <div className="text-black shadow-[0px_0px_12px_0px_black] dark:text-white border-2 max-w-[470px] mx-5 w-full rounded-xl p-7 bg-white dark:bg-gray-800">
        <div className="flex w-full justify-between mb-10">
          <h1 className="text-2xl font-semibold cursor-pointer animate-pulse">
            Sign-In
          </h1>
          <div className="flex gap-2 items-center cursor-pointer">
            <img
              className="size-6 sm:size-9 rounded-full"
              src="https://lh3.googleusercontent.com/rormhrw_yZt2v1OKZBaiFCSt8b8QU02kEKiuilfgnpGkOMQd87xm7b7SyIlGoHsL18M"
              alt="Logo"
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
              autoComplete="off"
              autoFocus
              placeholder="username"
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
              className="bg-transparent pl-3 border-b-[2px] mt-2 rounded-xl p-1 outline-none border-blue-700 dark:border-white-500 dark:focus:border-blue-500 w-full"
            />
            {errors.username && (
              <span className="text-red-500 absolute -bottom-1 left-0 text-xs">
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
              placeholder="password"
              id="password"
              {...register("password", { required: "Password is required" })}
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
              {signInLoading ? (
                <Loader2 className="animate-spin inline-block mr-2" />
              ) : (
                "Sign In"
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
              type="reset"
              onClick={() => navigate("/")}
              className="bg-green-500 hover:bg-green-700 dark:bg-green-700 p-1 dark:hover:bg-green-900 text-white outline-none font-bold rounded w-full"
            >
              Home
            </button>
          </div>
        </form>
        <div className="w-full flex justify-center pt-4 gap-4 text-black dark:text-white">
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-blue-500 dark:text-blue-300 underline"
          >
            Create Account
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signin;
