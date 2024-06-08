"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
// import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logedUser } from "@/Redux/Slice/SignIn";
interface User{
  id:string,
  accessToken:string
  refreshToken?:string
}
const SignIn = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch()
  
  const [isUploading, setIsUploading] = useState(false);
  // const { toast } = useToast();
  // const router = useRoutes();
  const signUpSchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    console.log(data);
  
    setIsUploading(true);
    try {
      const response = await axios.post("/api/v1/users/login", data);
      console.log(response);
      
      const loggedUser: User = {
        id: response.data.data.loggedUser._id,
        accessToken: response.data.data.accessToken
      };
      localStorage.setItem('accessToken',response.data.data.accessToken)
      localStorage.setItem('userId',response.data.data.loggedUser._id)
      dispatch(logedUser(loggedUser)); 
      navigator(`user-profile/${localStorage.getItem('userId')}`)
    } catch (error) {
      const err = error as AxiosError;

      const errorMessage =
        err.message ||
        "User account creation failed due to some reasons. Please check again.";
      console.log(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-white border-2 max-w-[490px] w-full rounded-lg p-6">
        <h1 className="text-center text-5xl underline py-5 mb-3">Sign In</h1>
        <form
          className="space-y-8 grid place-items-center"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <div className="flex w-full">
            <label htmlFor="username" className="text-[18px]">
              username 
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className="bg-transparent outline-none border-b-[3px] w-full border-slate-600 mx-4"
              />
          </div>
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
          <div className="flex w-full">
            <label htmlFor="password" className="text-[18px]">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="bg-transparent outline-none border-b-[3px] w-full border-slate-600 mx-4"
            />
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 outline-none border-slate-700 ml-3 font-bold py-2 px-4 rounded mt-4"
            disabled={isUploading}
          >
            {isUploading
              ? <Loader2 className="animate-spin" /> && "Please wait...."
              : "Sign-In"}
          </button>
        </form>
        <div className="w-full flex justify-center pt-4 gap-4">
          Create a new Account
          <NavLink to="/signup" className="text-blue-500 underline">
            Sign-Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
