import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "@/Redux/store";
import { SignIn } from "@/Redux/ThunkFunction/SignIn";
import { getUser } from "@/Redux/Slice/UserSlice";
import { useToast } from "@/components/ui/use-toast";

interface loginDetail {
  username: string;
  password: string;
}

const SignUp = () => {
  const { toast } = useToast();
  const userCredential = useSelector((state: RootState) => state.user);
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
  console.log("isLoading, error, success, data", {
    isLoading,
    error,
    success,
    data,
  });

  if (data) {
    dispatch(getUser(data?.data));
    localStorage.setItem("userId", data.data.id);
    localStorage.setItem("token", data.data.accessToken);
  }

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
            description:error,
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
      <div className="text-black dark:text-white border-2 max-w-[470px] w-full rounded-xl p-8 bg-white dark:bg-gray-800 shadow-lg">
        <h1 className="text-center text-5xl underline py-5 mb-3">Sign Up</h1>
        <form
          className="space-y-8 w-full relative"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <div className="relative">
            <label htmlFor="username" className="text-[18px] block">
              Username:
            </label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Username is required",
                // pattern: {
                //   value: /^[a-zA-Z0-9_]{3,30}$/,
                //   message: "Username should be 3-30 characters and contain only letters, numbers, and underscores"
                // }
              })}
              className="bg-transparent border-b-2 outline-none border-slate-700 dark:border-gray-500 dark:focus:border-blue-500 w-full"
            />
            {errors.username && (
              <span className="text-red-500 absolute -bottom-7 left-0 text-xs">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-[18px] block">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                // pattern: {
                //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                //   message: "Password must be at least 8 characters long and include uppercase, lowercase, and a number"
                // }
              })}
              className="bg-transparent border-b-2 outline-none border-slate-700 dark:border-gray-500 dark:focus:border-blue-500 w-full"
            />
            {errors.password && (
              <span className="text-red-500 absolute -bottom-7 left-0 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 text-white outline-none font-bold py-2 px-4 rounded mt-4 w-full"
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
            className="bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 text-white outline-none font-bold py-2 px-4 rounded mt-4 w-full"
          >
            Reset
          </button>
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
