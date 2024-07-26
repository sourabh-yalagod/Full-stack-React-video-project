import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "@/Redux/ThunkFunction/Register";
import { useEffect } from "react";

const SignUp = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const { user, isPending, error } = useSelector((state) => state.auth);
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("username", data.username);
    formData.append("avatar", data.avatar[0]);
    formData.append("coverImage", data.coverImage[0]);
    formData.append("password", data.password);
    formData.append("email", data.email);
    try {
      dispatch(registerUser(formData));
    } catch (error) {
      const err = error;
      const errorMessage =
        err.message ||
        "User account creation failed due to some reasons. Please check again.";
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    if (user && !error) {
      console.log('from Here');
      navigate("/signin");
    }
  }, [user, error, navigate]);

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 dark:bg-black">
      <div className="text-black dark:text-white grid place-items-center border-2 max-w-[470px] w-full rounded-xl p-8 bg-white dark:bg-gray-800">
        <h1 className="text-center text-5xl underline py-5 mb-3">Sign Up</h1>
        <form
          className="space-y-8 w-full grid place-content-between"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <div className="flex justify-between relative">
            <label htmlFor="fullname" className="text-[18px]">
              Fullname:
            </label>
            <input
              type="text"
              id="fullname"
              {...register("fullname", {
                required: "Fullname is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Fullname can only contain letters and spaces",
                },
                minLength: {
                  value: 3,
                  message: "Minmum lenght shoulg be 3 character",
                },
              })}
              className="bg-transparent border-b-2 outline-none border-slate-700 ml-3 w-full dark:border-gray-500 dark:focus:border-blue-500"
            />
            {errors.fullname && (
              <span className="text-red-500 absolute text-xs -bottom-5 left-5">
                {errors.fullname.message}
              </span>
            )}
          </div>

          <div className="flex justify-between">
            <label htmlFor="username" className="text-[18px]">
              Username:
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
              className="bg-transparent border-b-2 outline-none border-slate-700 ml-3 w-full dark:border-gray-500 dark:focus:border-blue-500"
            />
          </div>
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}

          <div className="flex justify-between">
            <label htmlFor="avatar" className="text-[18px]">
              Avatar:
            </label>
            <input
              type="file"
              id="avatar"
              {...register("avatar", { required: "Avatar is required" })}
              className="bg-transparent outline-none border-slate-700 ml-3 dark:border-gray-500"
            />
          </div>
          {errors.avatar && (
            <span className="text-red-500">{errors.avatar.message}</span>
          )}

          <div className="flex justify-between">
            <label htmlFor="coverImage" className="text-[18px]">
              Cover Image:
            </label>
            <input
              type="file"
              id="coverImage"
              {...register("coverImage", {
                required: "Cover Image is required",
              })}
              className="bg-transparent outline-none border-slate-700 ml-3 dark:border-gray-500"
            />
          </div>
          {errors.coverImage && (
            <span className="text-red-500">{errors.coverImage.message}</span>
          )}

          <div className="flex justify-between">
            <label htmlFor="password" className="text-[18px]">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="bg-transparent border-b-2 outline-none border-slate-700 ml-3 w-full dark:border-gray-500 dark:focus:border-blue-500"
            />
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <div className="flex justify-between">
            <label htmlFor="email" className="text-[18px]">
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="bg-transparent border-b-2 outline-none border-slate-700 ml-3 w-full dark:border-gray-500 dark:focus:border-blue-500"
            />
          </div>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 text-white outline-none border-slate-700 ml-3 font-bold py-2 px-4 rounded mt-4"
          >
            {isPending
              ? <Loader2 className="animate-spin" /> && "Please wait...."
              : "Sign Up"}
          </button>
          <button
            type="reset"
            onClick={() => reset()}
            className="bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 text-white outline-none border-slate-700 ml-3 font-bold py-2 px-4 rounded mt-4"
          >
            Reset
          </button>
        </form>
        <div className="w-full flex justify-center pt-4 gap-4 text-black dark:text-white">
          Have an account?{" "}
          <NavLink
            to="/signin"
            className="text-blue-500 dark:text-blue-300 underline"
          >
            Log-in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
