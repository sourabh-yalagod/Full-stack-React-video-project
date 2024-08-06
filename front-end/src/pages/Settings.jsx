import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/Redux/api/axiosInstance";
import APIError from "@/utils/APIError";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Image,
  ImageIcon,
  Loader2,
  LockIcon,
  PowerOffIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const time = new Date();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [tokens, setTokens] = useState("");
  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChangePassword = async ({ oldPassword, newPassword }) => {
    const response = await axiosInstance.patch("/api/v1/users/change-password", {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    return response?.data;
  };
  const passwordChangeMutation = useMutation({
    mutationFn: handleChangePassword,
    onSuccess: () => {
      toast({
        title: "Password Change Successfully",
        description: `At ${time.toLocaleTimeString()} \n ${time.toLocaleDateString()}`,
        variant: "default",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Password Change Failed Try Once again . . . . !",
        description: `At ${time.toLocaleTimeString()} \n ${time.toLocaleDateString()}`,
        variant: "destructive",
        duration: 2000,
      });
    },
  });

  const handleChangeAvatar = async ({ avatar }) => {
    const formData = new FormData();
    formData.append("avatar", avatar[0]);
    const response = await axiosInstance.patch(
      "/api/v1/users/change-avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  };
  const avatarChangeMutation = useMutation({
    mutationFn: handleChangeAvatar,
    onSuccess: () => {
      toast({
        title: "Avatar Change Successfully",
        description: `At ${time.toLocaleTimeString()} \n ${time.toLocaleDateString()}`,
        variant: "default",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Avatar Change Failed Try Once again . . . . !",
        description: `At ${time.toLocaleTimeString()} \n ${time.toLocaleDateString()}`,
        variant: "destructive",
        duration: 2000,
      });
    },
  });

  const handleChangeCoverImage = async ({ coverImage }) => {
    const formdata = new FormData();
    formdata.append("coverImage", coverImage[0]);
    const response = await axiosInstance.patch(
      "/api/v1/users/change-coverimage",
      formdata
    );
    return response?.data;
  };
  const coverImageChangeMutation = useMutation({
    mutationFn: handleChangeCoverImage,
    onSuccess: () => {
      toast({
        title: "Cover-Image Change Successfully",
        description: `At ${time.toLocaleTimeString()} \n ${time.toLocaleDateString()}`,
        variant: "default",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Cover-Image Change Failed Try Once again . . . . !",
        description: `At ${time.toLocaleTimeString()} \n ${time.toLocaleDateString()}`,
        variant: "destructive",
        duration: 2000,
      });
    },
  });

  const handleChangeNewToken = async () => {
    const response = await axiosInstance.get("/api/v1/users/generate-newtokens");
    return response?.data;
  };
  const newTokenMutation = useMutation({
    mutationFn: handleChangeNewToken,
    onSuccess: () => {
      toast({
        title: "New Auth token where generated successfully Successfully",
        description: `At ${time.toLocaleTimeString()} \n ${time.toLocaleDateString()}`,
        variant: "default",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title:
          "New Auth token where generation Failed Try Once again . . . . !",
        description: `At ${time.toLocaleTimeString()} \n ${time.toLocaleDateString()}`,
        variant: "destructive",
        duration: 2000,
      });
    },
  });

  return (
    <div className="min-h-screen w-full px-4 min-w-[375px] bg-white dark:bg-black">
      {error && <APIError />}
      <h1 className="text-3xl text-center py-7 text-slate-900 dark:text-slate-300 font-semibold">
        Customize Profile
      </h1>
      <div className="grid place-items-center text-slate-700 dark:text-slate-500 space-y-6">
        {/* Change password Dialog box */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full py-6 max-w-[250px] border-slate-600 dark:border-slate-400 rounded-xl text-[18px] hover:scale-95 transition-all"
            >
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-full text-slate-900 dark:text-white border-slate-900 dark:border-white rounded-xl px-4">
            <DialogHeader>
              <DialogTitle>Change Your Password</DialogTitle>
            </DialogHeader>
            <div className="grid items-center justify-around w-full gap-4 py-4">
              <div className="flex items-center w-full justify-between gap-5">
                <p className="flex gap-2 w-full items-center">
                  <LockIcon />
                  Old Password
                </p>
                <Input
                  id="old-password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="rounded-xl w-full min-w-[200px] bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                />
              </div>
              <div className="flex items-center w-full justify-between gap-5">
                <p className="flex gap-2 w-full items-center">
                  <LockIcon />
                  New Password
                </p>
                <Input
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-xl w-full min-w-[200px] bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <button
                onClick={() =>
                  passwordChangeMutation.mutate({ oldPassword, newPassword })
                }
                className="px-2 py-1 rounded-xl border-[1px] border-slate-900 dark:border-white"
              >
                {passwordChangeMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* change avatar Dialog Box */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full py-6 max-w-[250px] border-slate-600 dark:border-slate-400 rounded-xl text-[18px] hover:scale-95 transition-all"
            >
              Change Avatar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-full text-slate-900 dark:text-white border-slate-900 dark:border-white rounded-xl px-4">
            <DialogHeader>
              <DialogTitle>Change Your Avatar Image</DialogTitle>
            </DialogHeader>
            <div className="grid items-center justify-around w-full gap-4 py-4">
              <div className="flex items-center w-full justify-between gap-5">
                <p className="flex gap-2 w-full items-center">
                  <Image />
                  Avatar Image
                </p>
                <input
                  type="file"
                  onChange={(e) => setAvatar(e.target.files)}
                  className="rounded-xl w-full min-w-[200px] bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                />
              </div>
            </div>
            {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
            <DialogFooter>
              <button
                onClick={() => avatarChangeMutation.mutate({ avatar })}
                className="px-2 py-1 max-w-[250px] grid place-items-center mx-auto w-full rounded-xl border-[1px] border-slate-900 dark:border-white"
              >
                {avatarChangeMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Upload"
                )}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Change Cover Image Dialog box */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full py-6 max-w-[250px] border-slate-600 dark:border-slate-400 rounded-xl text-[18px] hover:scale-95 transition-all"
            >
              Change Cover Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-full text-slate-900 dark:text-white border-slate-900 dark:border-white rounded-xl px-4">
            <DialogHeader>
              <DialogTitle className="flex gap-2">
                <PowerOffIcon />
                Change Your profile Cover Image
              </DialogTitle>
            </DialogHeader>
            <div className="grid items-center justify-around w-full gap-4 py-4">
              <div className="flex items-center w-full justify-between gap-5">
                <p className="flex gap-2 w-full items-center">
                  <ImageIcon />
                  Cover Image
                </p>
                <input
                  type="file"
                  onChange={(e) => setCoverImage(e.target.files)}
                  className="rounded-xl w-full min-w-[200px] bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                />
              </div>
            </div>
            {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
            <DialogFooter>
              <button
                onClick={() => coverImageChangeMutation.mutate({ coverImage })}
                className="px-2 py-1 max-w-[250px] grid place-items-center mx-auto w-full rounded-xl border-[1px] border-slate-900 dark:border-white"
              >
                {coverImageChangeMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Upload"
                )}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* get New Token Dialog box */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full py-6 max-w-[250px] border-slate-600 dark:border-slate-400 rounded-xl text-[18px] hover:scale-95 transition-all"
            >
              Get New Tokens
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[455px] w-full grid place-items-center text-slate-900 dark:text-white border-slate-900 dark:border-white rounded-xl px-4">
            <DialogTitle>Get new Tokens for Authentication</DialogTitle>
            <Button
              onClick={() => newTokenMutation.mutate()}
              className="border-[1px] min-w-20 w-full border-slate-600 dark:border-slate-400 p-2 rounded-xl mt-3 max-w-40 hover:scale-95 transition-all"
            >
              {newTokenMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Get Tokens"
              )}
            </Button>
            {error && (
              <p className="text-red-700 dark:text-red-400">
                Token generating Process failed.....!
              </p>
            )}
            {tokens && (
              <p className="text-green-700 dark:text-green-400">
                Tokens generated successfully.....!
              </p>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
