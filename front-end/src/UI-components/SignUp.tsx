"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
// import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { NavLink , useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewAccount } from "@/Redux/Slice/SignUp";
interface User{
  id: string;
  username: string;
  refreshToken: string;
}
const SignUp = () => {
  const navigate = useNavigate()
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch()
  const signUpSchema = z.object({
    fullname: z.string(),
    username: z.string(),
    avatar: z.any(),
    coverImage: z.any(),
    password: z.string(),
    email: z.string().email(),
  });

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      username: "",
      coverImage: "",
      avatar: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("username", data.username);
      formData.append("avatar", data.avatar[0]); 
      formData.append("coverImage", data.coverImage[0]);
      formData.append("password", data.password);
      formData.append("email", data.email);
      
      console.log(formData);
      const response = await axios.post("/api/v1/users/register",formData);
      console.log(response.data.data);
      const user:User = {
        id:response?.data.data._id,
        username:response?.data.data.username,
        refreshToken:response.data.data.refreshToken
      }
      dispatch(createNewAccount(user))
      localStorage.setItem("user",JSON.stringify(user))
      navigate('/signin')
    } catch (error) {
      const err = error as AxiosError;
      
      const errorMessage = err.message || "User account creation failed due to some reasons. Please check again.";
      console.log(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-white grid place-items-center border-2 max-w-[470px] w-full rounded-xl p-8">
        <h1 className="text-center text-5xl underline py-5 mb-3">Sign Up</h1>
        <form
          className="space-y-8 w-full grid place-content-between"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <div className="flex justify-between">
            <label htmlFor="fullname" className="text-[18px]">Fullname:</label>
            <input
              type="text"
              id="fullname"
              {...register("fullname")}
              className="bg-transparent border-b-2 outline-none border-slate-700 ml-3 w-full"
            />
          </div>
          {errors.fullname && (
            <span className="text-red-500">{errors.fullname.message}</span>
          )}

          <div className="flex justify-between">
            <label htmlFor="username" className="text-[18px]">Username:</label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className="bg-transparent border-b-2 outline-none border-slate-700 ml-3 w-full"
            />
          </div>
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}

          <div className="flex justify-between">
            <label htmlFor="avatar" className="text-[18px]">Avatar:</label>
            <input
              type="file"
              id="avatar"
              {...register("avatar")}
              className="bg-transparent outline-none border-slate-700 ml-3"
            />
          </div>
          {errors.avatar && (
            <span className="text-red-500">{errors.avatar.message}</span>
          )}

          <div className="flex justify-between">
            <label htmlFor="coverImage" className="text-[18px]">Cover Image:</label>
            <input
              type="file"
              id="coverImage"
              {...register("coverImage")}
              className="bg-transparent outline-none border-slate-700 ml-3"
            />
          </div>
          {errors.coverImage && (
            <span className="text-red-500">{errors.coverImage.message}</span>
          )}

          <div className="flex justify-between">
            <label htmlFor="password" className="text-[18px]">Password:</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="bg-transparent border-b-2 outline-none border-slate-700 ml-3 w-full"
            />
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <div className="flex justify-between">
            <label htmlFor="email" className="text-[18px]">Email:</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="bg-transparent border-b-2 outline-none border-slate-700 ml-3 w-full"
            />
          </div>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 outline-none border-slate-700 ml-3 font-bold py-2 px-4 rounded mt-4"
            disabled={isUploading}
          >
            {isUploading ? (<Loader2 className="animate-spin" />&&'Please wait....') : "Sign Up"}
          </button>
        </form>
        <div className="w-full flex justify-center pt-4 gap-4">
          have already an Account ? <NavLink to="/signin" className="text-blue-900 underline">Log-in</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
