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
import axios from "axios";
import {
  Image,
  ImageIcon,
  Loader2,
  LockIcon,
  PowerOffIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]: any = useState("");
  const [tokens, setTokens]: any = useState("");
  const [avatar, setAvatar]: any = useState("");
  const [coverImage, setCoverImage]: any = useState("");
  const navigate = useNavigate()

  const changePassword = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch("/api/v1/users/change-password", {
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
      setResponse(res?.data);
      setError("");
      setOldPassword("");
      setNewPassword("");
      console.log("Response:", res?.data);
      navigate('/signin')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [oldPassword, newPassword]);

  const changeAvatar = useCallback(async () => {
    const formData = new FormData();
    formData.append("avatar", avatar[0]);

    try {
      setIsLoading(true);
      const res = await axios.patch("/api/v1/users/change-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res?.data?.data);
      setError("");
      setIsLoading(false);
    } catch (error) {
      setError("An error occurred while uploading the avatar.");
      setIsLoading(false);
    }
  }, [avatar]);

  const changeCoverImage = useCallback(async () => {
    if (!coverImage) {
      return setError("Please select coverImage....!");
    }
    try {
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append("coverImage", coverImage[0]);
      const response = await axios.patch(
        "/api/v1/users/change-coverimage",
        formdata
      );
      setResponse(response?.data);
      console.log(response);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [coverImage]);

  const genereteNewTokens = useCallback(async () => {
    console.log("Clicked");
    setIsLoading(true);
    try {
      const res = await axios.get("/api/v1/users/generate-newtokens");
      setTokens(res?.data);
      localStorage.setItem('accessToken',tokens?.data?.accessToken)
      localStorage.setItem('refreshToken',tokens?.data?.refreshToken)      
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [tokens]);

  return (
    <div className="min-h-screen w-full px-4 min-w-[375px]">
      <h1 className="text-3xl text-center my-7 text-slate-300 font-semibold">
        Customize Profile
      </h1>
      <div className="grid place-items-center  text-slate-500 space-y-6">
        {/* Change password Dialog box */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full py-6 max-w-[250px] border-slate-600 rounded-xl text-[18px] hover:scale-95 transition-all"
            >
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-full text-white border-white rounded-xl px-4">
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
                  className="rounded-xl w-full min-w-[200px]"
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
                  className="rounded-xl w-full min-w-[200px]"
                />
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {response && (
              <p className="text-green-500">Password changed successfully!</p>
            )}
            <DialogFooter>
              <button
                onClick={changePassword}
                className="px-2 py-1 rounded-xl border-[1px] border-white"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* change avatar Dailog Box */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full py-6 max-w-[250px] border-slate-600 rounded-xl text-[18px] hover:scale-95 transition-all"
            >
              Change Avatar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-full text-white border-white rounded-xl px-4">
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
                  onChange={(e: any) => setAvatar(e.target.files)}
                  className="rounded-xl w-full min-w-[200px] text-white"
                />
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {response && (
              <p className="text-green-500">Avatar uploaded successfully!</p>
            )}
            <DialogFooter>
              <button
                onClick={() => changeAvatar()}
                className="px-2 py-1 max-w-[250px] grid place-items-center mx-auto w-full rounded-xl border-[1px] border-white"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Upload"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Change Cover Image Dailog box */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full py-6 max-w-[250px] border-slate-600 rounded-xl text-[18px] hover:scale-95 transition-all"
            >
              Change Cover Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-full text-white border-white rounded-xl px-4">
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
                  onChange={(e: any) => setCoverImage(e.target.files)}
                  className="rounded-xl w-full min-w-[200px] text-white"
                />
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {response && (
              <p className="text-green-500">
                Cover Image uploaded successfully!
              </p>
            )}
            <DialogFooter>
              <button
                onClick={() => changeCoverImage()}
                className="px-2 py-1 max-w-[250px] grid place-items-center mx-auto w-full rounded-xl border-[1px] border-white"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Upload"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full py-6 max-w-[250px] border-slate-600 rounded-xl text-[18px] hover:scale-95 transition-all"
            >
              Get New Tokens
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[455px] w-full grid place-items-center text-white border-white rounded-xl px-4">
            <p>Click to Generate new Token (AUTH TOKENS)</p>
            <Button
              onClick={() => genereteNewTokens()}
              className="border-[1px] min-w-20 w-full border-slate-600 p-2 rounded-xl mt-3 max-w-40 hover:scale-95 transition-all"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Get Tokens"}
            </Button>
            {
                <p className="text-red-700">{error && 'Token generating Process failed.....!'}</p>
            }
            {
                <p className="text-green-700">{tokens && 'Tokens generated successfully.....!'}</p>
            }
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}