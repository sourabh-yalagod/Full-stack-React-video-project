import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/Redux/api/axiosInstance";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [signOutLoading, setSignOutLoading] = useState(false);
  const signOut = () => {
    (async () => {
      // Cookies.remove("refreshToken");
      try {
        setSignOutLoading(true);
        const response = await axiosInstance.post(`/api/v1/users/logout`);
        if (response) {
          toast({
            title: "Logg-Out successfull. . . . .!",
            description: response.data.message,
            duration: 1500,
          });
        }
        Cookies.remove('token')
      } catch (error) {
        toast({
          title: "Logg-Out Failed. . . . .!",
          description: error.message,
          variant: "destructive",
          duration: 1500,
        });
      }
    })();
    setTimeout(() => {
      setSignOutLoading(false);
      navigate("/");
    }, 1000);
  };
  return { signOutLoading, signOut };
};
