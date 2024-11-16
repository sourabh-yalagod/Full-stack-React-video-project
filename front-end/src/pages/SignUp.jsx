import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
      navigate("/signin");
      dispatch(registerUser(''));
    }

  }, [user, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Fullname */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="full name"
              id="fullname"
              {...register("fullname", {
                required: "Fullname is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Fullname can only contain letters and spaces",
                },
                minLength: {
                  value: 3,
                  message: "Minimum length should be 3 characters",
                },
              })}
              className="mt-1 block w-full p-1 pl-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 sm:text-sm"
            />
            {errors.fullname && (
              <span className="text-red-500 text-sm">
                {errors.fullname.message}
              </span>
            )}
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full p-1 pl-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="userName"
              id="username"
              {...register("username", { required: "Username is required" })}
              className="mt-1 block w-full p-1 pl-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 sm:text-sm"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          {/* Password */}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full p-1 pl-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Avatar */}
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              placeholder="avatar"
              {...register("avatar", { required: "Avatar is required" })}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 sm:text-sm"
            />
            {errors.avatar && (
              <span className="text-red-500 text-sm">
                {errors.avatar.message}
              </span>
            )}
          </div>

          {/* Cover Image */}
          <div>
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Cover Image
            </label>
            <input
              type="file"
              placeholder="cover image"
              id="coverImage"
              {...register("coverImage", {
                required: "Cover Image is required",
              })}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 sm:text-sm"
            />
            {errors.coverImage && (
              <span className="text-red-500 text-sm">
                {errors.coverImage.message}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Please wait...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              type="reset"
              onClick={() => reset()}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400"
            >
              Reset
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <NavLink
              to="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
